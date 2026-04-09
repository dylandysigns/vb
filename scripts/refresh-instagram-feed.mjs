import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const imageDir = path.join(publicDir, "instagram-cache");
const feedFile = path.join(publicDir, "instagram-feed.json");

const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || "verkeersschoolbeckers";
const INSTAGRAM_WEB_PROFILE_ENDPOINT = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`;
const INSTAGRAM_WEB_APP_ID = "936619743392459";
const INSTAGRAM_POST_LIMIT = 12;
const FETCH_RETRY_ATTEMPTS = 3;
const FETCH_RETRY_DELAY_MS = 1500;

function extensionFromContentType(contentType = "") {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "jpg";
}

function fallbackCaption() {
  return "Bekijk deze post op Instagram.";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options, label) {
  let lastError;

  for (let attempt = 1; attempt <= FETCH_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`${label} failed with status ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error;

      if (attempt < FETCH_RETRY_ATTEMPTS) {
        await delay(FETCH_RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw lastError;
}

function toIsoDate(timestamp) {
  return new Date((timestamp || 0) * 1000).toISOString();
}

function normalizePost(node) {
  if (!node?.id || !node?.shortcode) return null;

  const imageUrl = node.display_url || node.thumbnail_src;
  if (!imageUrl) return null;

  return {
    id: node.id,
    shortcode: node.shortcode,
    permalink: `https://www.instagram.com/p/${node.shortcode}/`,
    mediaType:
      node.__typename === "GraphSidecar" ? "sidecar" : node.is_video ? "video" : "image",
    sourceImageUrl: imageUrl,
    caption: node.edge_media_to_caption?.edges?.[0]?.node?.text?.trim() || fallbackCaption(),
    timestamp: toIsoDate(node.taken_at_timestamp),
    likes: node.edge_media_preview_like?.count || node.edge_liked_by?.count || 0,
    comments: node.edge_media_to_comment?.count || 0,
  };
}

async function fetchInstagramFeed() {
  const response = await fetchWithRetry(INSTAGRAM_WEB_PROFILE_ENDPOINT, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "*/*",
      "x-ig-app-id": INSTAGRAM_WEB_APP_ID,
      referer: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    },
  }, "Instagram profile request");

  const payload = await response.json();
  const edges = payload?.data?.user?.edge_owner_to_timeline_media?.edges;
  if (!Array.isArray(edges)) {
    throw new Error("Instagram profile payload did not contain timeline media");
  }

  return edges
    .map((edge) => normalizePost(edge?.node))
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, INSTAGRAM_POST_LIMIT);
}

async function downloadImage(url, fileBaseName) {
  const response = await fetchWithRetry(url, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      referer: "https://www.instagram.com/",
    },
  }, "Instagram image request");

  const extension = extensionFromContentType(response.headers.get("content-type") || "");
  const fileName = `${fileBaseName}.${extension}`;
  const filePath = path.join(imageDir, fileName);
  const arrayBuffer = await response.arrayBuffer();
  await writeFile(filePath, Buffer.from(arrayBuffer));
  return `/instagram-cache/${fileName}`;
}

async function cleanupStaleImages(validFiles) {
  const existingFiles = await readdir(imageDir).catch(() => []);
  await Promise.all(
    existingFiles
      .filter((fileName) => !validFiles.has(fileName))
      .map((fileName) => rm(path.join(imageDir, fileName), { force: true })),
  );
}

async function readCurrentFeed() {
  try {
    const raw = await readFile(feedFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.posts) ? parsed.posts : [];
  } catch {
    return [];
  }
}

async function main() {
  await mkdir(imageDir, { recursive: true });

  const currentPosts = await readCurrentFeed();
  const currentImageById = new Map(
    currentPosts
      .filter((post) => typeof post?.id === "string" && typeof post?.imageUrl === "string")
      .map((post) => [post.id, post.imageUrl]),
  );

  const posts = await fetchInstagramFeed();
  const validFiles = new Set();

  const cachedPosts = [];
  for (const post of posts) {
    let imageUrl = currentImageById.get(post.id);

    if (!imageUrl) {
      imageUrl = await downloadImage(post.sourceImageUrl, post.id);
    }

    validFiles.add(path.basename(imageUrl));
    cachedPosts.push({
      id: post.id,
      shortcode: post.shortcode,
      permalink: post.permalink,
      mediaType: post.mediaType,
      imageUrl,
      caption: post.caption,
      timestamp: post.timestamp,
      likes: post.likes,
      comments: post.comments,
    });
  }

  await cleanupStaleImages(validFiles);

  const payload = {
    username: INSTAGRAM_USERNAME,
    updatedAt: new Date().toISOString(),
    posts: cachedPosts,
  };

  await writeFile(feedFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Instagram feed refreshed for ${INSTAGRAM_USERNAME}: ${cachedPosts.length} posts`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
