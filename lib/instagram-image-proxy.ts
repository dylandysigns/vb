const ALLOWED_HOST_SUFFIXES = [
  ".cdninstagram.com",
  ".fbcdn.net",
];

function isAllowedInstagramHost(hostname: string) {
  return ALLOWED_HOST_SUFFIXES.some((suffix) => hostname === suffix.slice(1) || hostname.endsWith(suffix));
}

export function getInstagramImageUrl(input: unknown) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Missing Instagram image URL");
  }

  const parsed = new URL(input);
  if (parsed.protocol !== "https:") {
    throw new Error("Instagram image URL must use HTTPS");
  }

  if (!isAllowedInstagramHost(parsed.hostname)) {
    throw new Error("Instagram image host is not allowed");
  }

  return parsed.toString();
}

export async function fetchInstagramImage(input: unknown) {
  const imageUrl = getInstagramImageUrl(input);
  const response = await fetch(imageUrl, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      referer: "https://www.instagram.com/",
    },
  });

  if (!response.ok) {
    throw new Error(`Instagram image request failed with status ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    contentType: response.headers.get("content-type") || "image/jpeg",
  };
}
