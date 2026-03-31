const PLACE_ID = process.env.GOOGLE_PLACES_PLACE_ID || "ChIJNRP23pvzxkcRUBVGovxnLSQ";
const GOOGLE_PLACES_ENDPOINT = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=nl`;

type GooglePlaceReview = {
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: {
    displayName?: string;
  };
};

type GooglePlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
};

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  return initials || "VB";
}

function normalizeReview(review: GooglePlaceReview, index: number) {
  const author = review.authorAttribution?.displayName?.trim() || `Google reviewer ${index + 1}`;
  const text = review.text?.text?.trim() || "Deze leerling heeft een positieve Google review achtergelaten.";

  return {
    name: author,
    text,
    rating: review.rating || 5,
    initials: getInitials(author),
    published: review.relativePublishTimeDescription || "Google review",
    publishTime: review.publishTime || "",
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing GOOGLE_PLACES_API_KEY" });
  }

  try {
    const response = await fetch(GOOGLE_PLACES_ENDPOINT, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "displayName",
          "rating",
          "userRatingCount",
          "reviews",
          "reviews.publishTime",
          "googleMapsUri",
        ].join(","),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: "Google Places request failed", details: errorText });
    }

    const place = (await response.json()) as GooglePlaceResponse;
    const reviews = (place.reviews || [])
      .map(normalizeReview)
      .sort((a, b) => {
        const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0;
        const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 6)
      .map(({ publishTime, ...review }) => review);
    const featuredReview = reviews[0];

    const payload = {
      rating: typeof place.rating === "number" ? place.rating.toFixed(1) : "5.0",
      count: place.userRatingCount || reviews.length,
      profileUrl:
        place.googleMapsUri ||
        "https://www.google.com/maps/search/?api=1&query=Verkeersschool%20Beckers&query_place_id=ChIJNRP23pvzxkcRUBVGovxnLSQ",
      featuredReview: featuredReview
        ? {
            quote: featuredReview.text,
            author: featuredReview.name,
            label: "Google review",
          }
        : {
            quote: "Leerlingen waarderen Verkeersschool Beckers om de rustige begeleiding en duidelijke uitleg.",
            author: "Google review",
            label: "Live gekoppeld",
          },
      reviews,
    };

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error while fetching Google reviews",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
