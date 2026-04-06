// This uses Instagram's public web profile response rather than an official API.
// It keeps the site maintenance-free for the user, but may need revisiting if Instagram changes it.
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || "verkeersschoolbeckers";
const INSTAGRAM_WEB_PROFILE_ENDPOINT = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_USERNAME}`;
const INSTAGRAM_WEB_APP_ID = "936619743392459";
const INSTAGRAM_POST_LIMIT = 12;

type InstagramEdgeNode = {
  __typename?: string;
  id?: string;
  shortcode?: string;
  display_url?: string;
  thumbnail_src?: string;
  is_video?: boolean;
  taken_at_timestamp?: number;
  edge_media_to_caption?: {
    edges?: Array<{ node?: { text?: string } }>;
  };
  edge_media_to_comment?: {
    count?: number;
  };
  edge_media_preview_like?: {
    count?: number;
  };
  edge_liked_by?: {
    count?: number;
  };
};

type InstagramProfileResponse = {
  data?: {
    user?: {
      edge_owner_to_timeline_media?: {
        edges?: Array<{
          node?: InstagramEdgeNode;
        }>;
      };
    };
  };
  status?: string;
};

export type InstagramPost = {
  id: string;
  shortcode: string;
  permalink: string;
  mediaType: "image" | "video" | "sidecar";
  imageUrl: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
};

function normalizePost(node: InstagramEdgeNode): InstagramPost | null {
  if (!node.id || !node.shortcode) return null;

  const imageUrl = node.display_url || node.thumbnail_src;
  if (!imageUrl) return null;

  const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text?.trim() || "Bekijk deze post op Instagram.";
  const mediaType =
    node.__typename === "GraphSidecar" ? "sidecar" : node.is_video ? "video" : "image";

  return {
    id: node.id,
    shortcode: node.shortcode,
    permalink: `https://www.instagram.com/p/${node.shortcode}/`,
    mediaType,
    imageUrl,
    caption,
    timestamp: new Date((node.taken_at_timestamp || 0) * 1000).toISOString(),
    likes: node.edge_media_preview_like?.count || node.edge_liked_by?.count || 0,
    comments: node.edge_media_to_comment?.count || 0,
  };
}

export async function fetchInstagramFeed() {
  const response = await fetch(INSTAGRAM_WEB_PROFILE_ENDPOINT, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "*/*",
      "x-ig-app-id": INSTAGRAM_WEB_APP_ID,
      referer: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    },
  });

  if (!response.ok) {
    throw new Error(`Instagram profile request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as InstagramProfileResponse;
  const edges = payload.data?.user?.edge_owner_to_timeline_media?.edges;
  if (!Array.isArray(edges)) {
    throw new Error("Instagram profile payload did not contain timeline media");
  }

  return edges
    .map((edge) => normalizePost(edge.node || {}))
    .filter((post): post is InstagramPost => Boolean(post))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, INSTAGRAM_POST_LIMIT);
}
