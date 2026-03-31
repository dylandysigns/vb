const PLACE_ID = process.env.GOOGLE_PLACES_PLACE_ID || "ChIJNRP23pvzxkcRUBVGovxnLSQ";
const LEGACY_DETAILS_ENDPOINT =
  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&language=nl&reviews_sort=newest&fields=rating,user_ratings_total,reviews,url&key=`;
const PLACES_NEW_ENDPOINT = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=nl`;

type NormalizedReview = {
  name: string;
  text: string;
  rating: number;
  initials: string;
  published: string;
  publishTime?: string;
};

type LegacyReview = {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type LegacyPlaceResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: LegacyReview[];
  };
  status?: string;
  error_message?: string;
};

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

function normalizePublishedLabel(value?: string) {
  if (!value) return "Google review";

  const label = value.trim().toLowerCase();

  if (label === "vandaag") return "Vandaag";
  if (label === "gisteren") return "Gisteren";
  if (label.includes("afgelopen week")) return "Deze week";
  if (label.includes("afgelopen maand")) return "Deze maand";

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeLegacyReview(review: LegacyReview, index: number): NormalizedReview {
  const author = review.author_name?.trim() || `Google reviewer ${index + 1}`;
  return {
    name: author,
    text: review.text?.trim() || "Deze leerling heeft een positieve Google review achtergelaten.",
    rating: review.rating || 5,
    initials: getInitials(author),
    published: normalizePublishedLabel(review.relative_time_description),
    publishTime: typeof review.time === "number" ? new Date(review.time * 1000).toISOString() : "",
  };
}

function normalizeNewReview(review: GooglePlaceReview, index: number): NormalizedReview {
  const author = review.authorAttribution?.displayName?.trim() || `Google reviewer ${index + 1}`;
  return {
    name: author,
    text: review.text?.text?.trim() || "Deze leerling heeft een positieve Google review achtergelaten.",
    rating: review.rating || 5,
    initials: getInitials(author),
    published: normalizePublishedLabel(review.relativePublishTimeDescription),
    publishTime: review.publishTime || "",
  };
}

function sortNewestFirst<T extends { publishTime?: string }>(reviews: T[]) {
  return [...reviews].sort((a, b) => {
    const aTime = a.publishTime ? new Date(a.publishTime).getTime() : 0;
    const bTime = b.publishTime ? new Date(b.publishTime).getTime() : 0;
    return bTime - aTime;
  });
}

function buildPayload(input: {
  rating?: number;
  count?: number;
  profileUrl?: string;
  reviews: NormalizedReview[];
}) {
  const reviews = sortNewestFirst(input.reviews)
    .slice(0, 6)
    .map(({ publishTime, ...review }) => review);
  const featuredReview = reviews[0];

  return {
    rating: typeof input.rating === "number" ? input.rating.toFixed(1) : "5.0",
    count: input.count || reviews.length,
    profileUrl:
      input.profileUrl ||
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
}

async function fetchLegacyNewest(apiKey: string) {
  const response = await fetch(`${LEGACY_DETAILS_ENDPOINT}${apiKey}`);
  if (!response.ok) {
    throw new Error(`Legacy Places request failed with status ${response.status}`);
  }

  const data = (await response.json()) as LegacyPlaceResponse;
  if (data.status !== "OK" || !data.result) {
    throw new Error(data.error_message || data.status || "Legacy Places response invalid");
  }

  return buildPayload({
    rating: data.result.rating,
    count: data.result.user_ratings_total,
    profileUrl: data.result.url,
    reviews: (data.result.reviews || []).map(normalizeLegacyReview),
  });
}

async function fetchPlacesNew(apiKey: string) {
  const response = await fetch(PLACES_NEW_ENDPOINT, {
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
    throw new Error(`Places API (New) request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GooglePlaceResponse;
  return buildPayload({
    rating: data.rating,
    count: data.userRatingCount,
    profileUrl: data.googleMapsUri,
    reviews: (data.reviews || []).map(normalizeNewReview),
  });
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
    let payload;

    try {
      payload = await fetchLegacyNewest(apiKey);
    } catch {
      payload = await fetchPlacesNew(apiKey);
    }

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error while fetching Google reviews",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
