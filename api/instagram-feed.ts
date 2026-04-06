import { fetchInstagramFeed } from "../lib/instagram-feed";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const posts = await fetchInstagramFeed();
    res.setHeader("Cache-Control", "s-maxage=10800, stale-while-revalidate=3600");
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error while fetching Instagram feed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
