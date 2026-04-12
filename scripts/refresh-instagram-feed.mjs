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
const INSTAGRAM_WEB_PROFILE_ENDPOINT = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`;
const INSTAGRAM_WEB_APP_ID = "936619743392459";
const INSTAGRAM_POST_LIMIT = 12;
const FETCH_RETRY_ATTEMPTS = 5;
const FETCH_RETRY_DELAY_MS = 15000;
const IMAGE_DOWNLOAD_DELAY_MS = 1000;
const ALLOW_STALE_INSTAGRAM_ON_FAILURE = process.env.ALLOW_STALE_INSTAGRAM_ON_FAILURE === "true";
const LOG_PREFIX = "[instagram:refresh]";

class HttpStatusError extends Error {
  constructor(label, status, message) {
    super(message || `${label} failed with status ${status}`);
    this.name = "HttpStatusError";
    this.label = label;
    this.status = status;
  }
}

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

function log(message) {
  console.log(`${LOG_PREFIX} ${message}`);
}

function getErrorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function fetchWithRetry(url, options, label) {
  let lastError;

  for (let attempt = 1; attempt <= FETCH_RETRY_ATTEMPTS; attempt += 1) {
    try {
      log(`${label}: attempt ${attempt}/${FETCH_RETRY_ATTEMPTS}`);
      const response = await fetch(url, options);
      log(`${label}: HTTP ${response.status}`);

      if (!response.ok) {
        if (response.status === 429 && attempt < FETCH_RETRY_ATTEMPTS) {
          const retryAfterSeconds = Number(response.headers.get("retry-after"));
          const waitTime = Number.isFinite(retryAfterSeconds)
            ? retryAfterSeconds * 1000
            : FETCH_RETRY_DELAY_MS * 2 ** (attempt - 1);
          log(`${label} was rate limited (429). Retrying in ${waitTime}ms...`);
          await delay(waitTime);
          continue;
        }

        throw new HttpStatusError(label, response.status);
      }

      log(`${label}: request succeeded`);
      return response;
    } catch (error) {
      lastError = error;

      if (attempt < FETCH_RETRY_ATTEMPTS) {
        const waitTime = FETCH_RETRY_DELAY_MS * attempt;
        log(`${label} failed on attempt ${attempt}: ${getErrorMessage(error)}. Retrying in ${waitTime}ms...`);
        await delay(waitTime);
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
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
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

  const posts = edges
    .map((edge) => normalizePost(edge?.node))
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, INSTAGRAM_POST_LIMIT);

  log(`Instagram profile request: fetched ${posts.length} posts`);
  return posts;
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
  log(`Loaded ${currentPosts.length} cached posts from ${feedFile}`);
  const currentImageById = new Map(
    currentPosts
      .filter((post) => typeof post?.id === "string" && typeof post?.imageUrl === "string")
      .map((post) => [post.id, post.imageUrl]),
  );

  let posts;
  try {
    posts = await fetchInstagramFeed();
  } catch (error) {
    const reason = getErrorMessage(error);
    log(`Refresh failed before writing feed: ${reason}`);
    if (error instanceof Error && error.stack) {
      console.log(error.stack);
    }

    if (ALLOW_STALE_INSTAGRAM_ON_FAILURE && currentPosts.length > 0) {
      log(`JSON file unchanged: using cached file at ${feedFile}`);
      console.log(`⚠️ Feed unchanged: using cached data (reason: ${reason})`);
      return;
    }

    throw error;
  }
  const validFiles = new Set();

  const cachedPosts = [];
  for (const post of posts) {
    let imageUrl = currentImageById.get(post.id);

    if (!imageUrl) {
      imageUrl = await downloadImage(post.sourceImageUrl, post.id);
      await delay(IMAGE_DOWNLOAD_DELAY_MS);
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

  const postsChanged = JSON.stringify(currentPosts) !== JSON.stringify(cachedPosts);
  log(`Feed comparison: ${postsChanged ? "changes detected" : "no content changes detected"}`);

  await cleanupStaleImages(validFiles);

  const payload = {
    username: INSTAGRAM_USERNAME,
    updatedAt: new Date().toISOString(),
    posts: cachedPosts,
  };

  await writeFile(feedFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  log(`JSON file written: ${feedFile}`);
  log(`Written ${cachedPosts.length} posts to public/instagram-feed.json`);
  console.log(`✅ Feed updated: ${cachedPosts.length} posts written`);
}

main().catch((error) => {
  log(`Fatal error: ${getErrorMessage(error)}`);
  if (error instanceof Error && error.stack) {
    console.log(error.stack);
  }
  process.exitCode = 1;
});
