import { fetchInstagramImage } from "../lib/instagram-image-proxy";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { buffer, contentType } = await fetchInstagramImage(req.query?.url);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "s-maxage=172800, stale-while-revalidate=43200");
    return res.status(200).send(buffer);
  } catch (error) {
    return res.status(400).json({
      error: "Unexpected error while fetching Instagram image",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
