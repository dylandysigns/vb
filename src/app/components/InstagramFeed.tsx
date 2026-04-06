import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Heart, Instagram, MessageCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/verkeersschoolbeckers/";

type InstagramPost = {
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

const fallbackPosts: InstagramPost[] = [
  {
    id: "fallback-1",
    shortcode: "fallback-1",
    permalink: INSTAGRAM_PROFILE_URL,
    mediaType: "image",
    imageUrl: "",
    caption: "Volg de nieuwste felicitaties, geslaagde leerlingen en mooie examendagen van Verkeersschool Beckers.",
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
  },
  {
    id: "fallback-2",
    shortcode: "fallback-2",
    permalink: INSTAGRAM_PROFILE_URL,
    mediaType: "image",
    imageUrl: "",
    caption: "Hier delen we vooral de blije momenten waarop leerlingen hun rijbewijs in handen hebben.",
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
  },
  {
    id: "fallback-3",
    shortcode: "fallback-3",
    permalink: INSTAGRAM_PROFILE_URL,
    mediaType: "image",
    imageUrl: "",
    caption: "Een overzicht van recente succesmomenten, helemaal in de Beckers-stijl van de rest van de site.",
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
  },
];

async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch("/instagram-feed.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Instagram feed error: ${response.status}`);
  }

  const payload = (await response.json()) as { posts?: InstagramPost[] };
  return Array.isArray(payload.posts) ? payload.posts : [];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[1.55rem] border border-[#dce7f8] bg-white">
      <div className="relative aspect-square animate-pulse overflow-hidden bg-[linear-gradient(135deg,#dce8fb_0%,#f2f7ff_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,86,227,0.12),transparent_36%)]" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <div className="h-8 w-24 rounded-full bg-white/55" />
          <div className="h-8 w-20 rounded-full bg-white/40" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12">
          <div className="h-10 rounded-2xl bg-[rgba(7,24,66,0.14)]" />
        </div>
      </div>
    </div>
  );
}

function FallbackCard({ post }: { post: InstagramPost }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[1.55rem] border border-[#dce7f8] bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-[linear-gradient(135deg,#1956E3_0%,#2d73ff_52%,#f5a623_160%)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_38%)]" />
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(7,24,66,0.58))] px-4 pb-4 pt-12">
          <p className="max-w-[14rem] text-sm leading-6 text-white/84" style={{ fontFamily: body, fontWeight: 600 }}>
            {truncate(post.caption, 108)}
          </p>
        </div>
        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/14 backdrop-blur-sm">
              <Instagram className="h-6 w-6" />
            </div>
            <span className="rounded-full bg-white/14 px-3 py-1.5 text-[0.72rem] uppercase tracking-[0.08em] text-white/88 backdrop-blur-sm" style={{ fontFamily: body, fontWeight: 700 }}>
              Profiel
            </span>
          </div>
          <div className="pr-16">
            <p className="text-[1.15rem] leading-tight" style={{ fontFamily: heading, fontWeight: 800 }}>
              Verkeersschool Beckers
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

function PostCard({ post }: { post: InstagramPost }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[1.55rem] border border-[#dce7f8] bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-[#edf4ff]">
        <img
          src={post.imageUrl}
          alt={post.caption ? truncate(post.caption, 100) : "Instagram post van Verkeersschool Beckers"}
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#071842]/0 transition-colors duration-300 group-hover:bg-[#071842]/18" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-5">
          <div className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-[#1956E3] px-4 py-2 text-white opacity-0 shadow-[0_16px_36px_rgba(7,24,66,0.18)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" style={{ fontFamily: body, fontWeight: 700 }}>
            <Instagram className="h-4 w-4" />
            Open Instagram
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(7,24,66,0.76))] px-4 pb-4 pt-12">
          <div className="flex items-end justify-between gap-3 text-white">
            <div className="flex items-center gap-3 text-sm" style={{ fontFamily: body, fontWeight: 700 }}>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-[#FD9F26]" />
                {post.likes}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </span>
            </div>
            <span className="text-[0.72rem] uppercase tracking-[0.08em] text-white/58" style={{ fontFamily: body, fontWeight: 600 }}>
              {formatDate(post.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function InstagramFeed() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    duration: 28,
  });
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchInstagramPosts();
        if (!cancelled) {
          setPosts(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const slides = loading
    ? Array.from({ length: 3 }).map((_, index) => ({ type: "skeleton" as const, key: `skeleton-${index}` }))
    : (error || posts.length === 0 ? fallbackPosts : posts).map((post) => ({
        type: error || posts.length === 0 ? ("fallback" as const) : ("post" as const),
        key: post.id,
        post,
      }));

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <span
                className="inline-block rounded-full bg-[#1956E3]/8 px-5 py-2 text-sm tracking-wide text-[#1956E3]"
                style={{ fontFamily: body, fontWeight: 700 }}
              >
                Instagram
              </span>
              <h2
                className="mt-5 text-4xl tracking-[-0.03em] text-[#071842] sm:text-5xl lg:text-[3.1rem]"
                style={{ fontFamily: heading, fontWeight: 900 }}
              >
                Deze geslaagde leerlingen gingen je voor bij Beckers
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-500" style={{ fontFamily: body, fontWeight: 500 }}>
                Rijbewijs in the pocket, foto erbij en gaan. Straks sta jij hier gewoon ook tussen.
              </p>

              <ScrollReveal delay={140}>
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FD9F26] px-6 py-3.5 text-white shadow-[0_14px_36px_rgba(245,166,35,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(245,166,35,0.28)]"
                  style={{ fontFamily: body, fontWeight: 700 }}
                >
                  <Instagram className="h-4 w-4" />
                  Volg ons op Instagram
                </a>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={150}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex">
              {slides.map((slide, index) => {
                const distanceFromActive = Math.abs(selectedIndex - index);
                const stateClass =
                  distanceFromActive === 0
                    ? "opacity-100 scale-100"
                    : distanceFromActive === 1
                      ? "opacity-90 scale-[0.975] lg:scale-[0.96]"
                      : "opacity-72 scale-[0.94]";

                return (
                <div
                  key={slide.key}
                  className={`min-w-0 flex-[0_0_84%] pl-4 transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:flex-[0_0_44%] lg:flex-[0_0_28%] ${stateClass}`}
                  aria-current={distanceFromActive === 0}
                >
                  {slide.type === "skeleton" && <SkeletonCard />}
                  {slide.type === "fallback" && <FallbackCard post={slide.post} />}
                  {slide.type === "post" && <PostCard post={slide.post} />}
                </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6e4f7] bg-white text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1956E3] hover:text-[#1956E3] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Vorige Instagram post"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    selectedIndex === index ? "w-8 bg-[#1956E3]" : "w-2.5 bg-[#c9d7ee] hover:bg-[#9bb8ea]"
                  }`}
                  aria-label={`Ga naar Instagram slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6e4f7] bg-white text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1956E3] hover:text-[#1956E3] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Volgende Instagram post"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
