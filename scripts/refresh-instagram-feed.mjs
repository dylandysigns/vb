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
const APIFY_TOKEN = process.env.APIFY_TOKEN?.trim() || "";
const APIFY_INSTAGRAM_ACTOR_ID = process.env.APIFY_INSTAGRAM_ACTOR_ID || "apify/instagram-api-scraper";
const APIFY_API_BASE_URL = "https://api.apify.com/v2";
const INSTAGRAM_POST_LIMIT = 12;
const FETCH_RETRY_ATTEMPTS = 4;
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

function actorIdForUrl(actorId) {
  return actorId.replace("/", "~");
}

function buildApifyEndpoint() {
  const actorPath = actorIdForUrl(APIFY_INSTAGRAM_ACTOR_ID);
  const endpoint = new URL(`${APIFY_API_BASE_URL}/acts/${actorPath}/run-sync-get-dataset-items`);
  endpoint.searchParams.set("token", APIFY_TOKEN);
  endpoint.searchParams.set("clean", "true");
  return endpoint.toString();
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

function toIsoDate(value) {
  if (!value) return new Date(0).toISOString();
  if (typeof value === "number") return new Date(value * 1000).toISOString();

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date(0).toISOString();
  return parsed.toISOString();
}

function getSourceImageUrl(item) {
  if (typeof item?.displayUrl === "string" && item.displayUrl) return item.displayUrl;
  if (typeof item?.display_url === "string" && item.display_url) return item.display_url;
  if (typeof item?.thumbnailUrl === "string" && item.thumbnailUrl) return item.thumbnailUrl;
  if (typeof item?.thumbnail_src === "string" && item.thumbnail_src) return item.thumbnail_src;
  if (Array.isArray(item?.images) && item.images.length > 0) {
    const lastImage = item.images[item.images.length - 1];
    if (typeof lastImage === "string" && lastImage) return lastImage;
    if (typeof lastImage?.url === "string" && lastImage.url) return lastImage.url;
  }
  if (Array.isArray(item?.childPosts) && item.childPosts.length > 0) {
    return getSourceImageUrl(item.childPosts[0]);
  }

  return "";
}

function normalizeMediaType(item) {
  const rawType = String(item?.type || item?.mediaType || "").toLowerCase();
  if (rawType.includes("sidecar") || rawType.includes("carousel")) return "sidecar";
  if (rawType.includes("video") || rawType.includes("reel")) return "video";
  return "image";
}

function normalizePost(item) {
  const id = item?.id ? String(item.id) : "";
  const shortcode = item?.shortCode || item?.shortcode || "";
  const permalink = item?.url || (shortcode ? `https://www.instagram.com/p/${shortcode}/` : "");
  const sourceImageUrl = getSourceImageUrl(item);

  if (!id || !shortcode || !permalink || !sourceImageUrl) return null;

  return {
    id,
    shortcode,
    permalink,
    mediaType: normalizeMediaType(item),
    sourceImageUrl,
    caption: typeof item?.caption === "string" && item.caption.trim() ? item.caption.trim() : fallbackCaption(),
    timestamp: toIsoDate(item?.timestamp || item?.takenAtTimestamp || item?.taken_at_timestamp),
    likes: item?.likesCount || item?.likes_count || 0,
    comments: item?.commentsCount || item?.comments_count || 0,
  };
}

async function fetchInstagramFeed() {
  if (!APIFY_TOKEN) {
    throw new Error("Missing APIFY_TOKEN — add it locally and in your GitHub Actions secrets.");
  }

  const endpoint = buildApifyEndpoint();
  const input = {
    directUrls: [`https://www.instagram.com/${INSTAGRAM_USERNAME}/`],
    resultsType: "posts",
    resultsLimit: INSTAGRAM_POST_LIMIT,
    searchType: "user",
    searchLimit: 1,
  };

  log(`Using Apify actor ${APIFY_INSTAGRAM_ACTOR_ID} for @${INSTAGRAM_USERNAME}`);
  const response = await fetchWithRetry(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  }, "Apify Instagram scraper request");

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Apify dataset response did not return an array of posts");
  }

  const posts = payload
    .map((item) => normalizePost(item))
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, INSTAGRAM_POST_LIMIT);

  log(`Apify Instagram scraper request: fetched ${posts.length} posts`);
  if (posts.length === 0) {
    throw new Error("Apify scraper returned zero Instagram posts");
  }

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
