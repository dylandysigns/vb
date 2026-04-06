import { useEffect, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const fallbackReviewData = {
  rating: "5.0",
  count: 13,
  profileUrl: "https://www.google.com/search?sca_esv=9a0f969563c68435&sxsrf=ANbL-n4WfQNzSqwTN-LiAukKH8EABJaA1Q:1773861541145&q=Verkeersschool+Beckers+Zaltbommel+reviews&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x8Ju2fivqIn1EOdZs7MQk8Or7dcQpKj2rLKFasRxrMkphYX4NRuEjV-X3qxsU4lOTMT2bKM%3D&uds=ALYpb_nym6KF0x8SxdKYIKb0xuW-mbLWCKZxXKwpwFd9a-gFwIqBTKf23uVT3p6er2E34pQ_q1vthy27O1VWEYYtsoU3ctB17z6QFvINfBqtAl-yG499EddoKS3zL9SrZlGTW8G06Ndx&sa=X&ved=2ahUKEwjNtKmYlaqTAxW2wAIHHdExNKAQ3PALegQIKhAF&biw=1512&bih=828&dpr=2",
  featuredReview: {
    quote: "Hele aardige en vooral duidelijke instructeur. Alles wordt per les goed uitgelegd.",
    author: "Arie Koster",
    label: "Google review",
  },
  reviews: [
    { name: "kenpetgam perers", text: "In een keer geslaagd voor mijn motorrijbewijs. Erg fijne lessen en goede instructies.", rating: 5, initials: "KP", published: "9 maanden geleden" },
    { name: "Arie Koster", text: "Hele aardige en vooral duidelijke instructeur. Alles wordt per les goed uitgelegd.", rating: 5, initials: "AK", published: "1 jaar geleden" },
    { name: "Fam Loukili", text: "Super goede, professionele en fijne rijschool. Je wordt goed voorbereid op het praktijkexamen.", rating: 5, initials: "FL", published: "1 jaar geleden" },
    { name: "Mark Koenis", text: "Gezellig familiebedrijf met goede instructeurs. Met hun hulp in 1 keer geslaagd.", rating: 5, initials: "MK", published: "2 jaar geleden" },
    { name: "Bjorn", text: "Rustige, geduldige instructeur die goede feedback geeft.", rating: 5, initials: "BJ", published: "2 jaar geleden" },
    { name: "Feike Goudsmit", text: "Legt heel goed uit, blijft rustig en geeft veel vertrouwen. Beide motorexamens in 1 keer gehaald.", rating: 5, initials: "FG", published: "4 jaar geleden" },
  ],
};

type Review = {
  name: string;
  text: string;
  rating: number;
  initials: string;
  published: string;
};

type ReviewData = {
  rating: string;
  count: number;
  profileUrl: string;
  featuredReview: {
    quote: string;
    author: string;
    label: string;
  };
  reviews: Review[];
};

export function Testimonials() {
  const [reviewData, setReviewData] = useState<ReviewData>(fallbackReviewData);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const response = await fetch("/api/google-reviews", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ReviewData;
        if (isMounted && data?.rating && Array.isArray(data?.reviews)) {
          setReviewData(data);
        }
      } catch {
        // Keep the fallback review payload when the API is unavailable.
      }
    }

    void loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleReviews = isMobile
    ? reviewData.reviews.slice(0, 3)
    : reviewData.reviews;

  return (
    <section
      id="reviews"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #1956E3 0%, #1956E3 40%, #1956E3 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Google Review badge */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#FD9F26] bg-[#FD9F26]/10 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Reviews
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-white mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              Wat onze leerlingen zeggen
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ fontFamily: body, fontWeight: 400 }}>
              Gebaseerd op {reviewData.count} openbare Google reviews van leerlingen van Verkeersschool Beckers.
            </p>

            {/* Google Reviews trust badge */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">
              {/* Google G icon */}
              <div className="flex items-center gap-2.5">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-lg" style={{ fontFamily: heading, fontWeight: 800 }}>{reviewData.rating}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FD9F26] text-[#FD9F26]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/50 text-xs" style={{ fontFamily: body }}>{reviewData.count} Google reviews</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <a
                href={reviewData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-[#FD9F26] transition-colors duration-300 text-xs"
                style={{ fontFamily: body, fontWeight: 500 }}
              >
                Bekijk op Google
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          <ScrollReveal className="lg:col-span-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-md p-7 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-1.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FD9F26] text-[#FD9F26]" />
                    ))}
                  </div>
                  <p className="text-white text-xl sm:text-2xl leading-relaxed" style={{ fontFamily: heading, fontWeight: 700 }}>
                    "{reviewData.featuredReview.quote}"
                  </p>
                </div>
                <div className="lg:text-right">
                  <p className="text-white text-base" style={{ fontFamily: body, fontWeight: 600 }}>
                    {reviewData.featuredReview.author}
                  </p>
                  <p className="text-white/60 text-sm mt-1" style={{ fontFamily: body, fontWeight: 500 }}>
                    {reviewData.featuredReview.label}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {visibleReviews.map((review, i) => (
            <ScrollReveal key={`${review.name}-${review.published}-${i}`} delay={i * 80}>
              <div className="bg-white/8 backdrop-blur-md rounded-2xl p-6 border border-white/8 hover:bg-white/12 transition-all duration-400 group hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#FD9F26] text-[#FD9F26] transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${j * 30}ms` }} />
                    ))}
                  </div>
                  {/* Google badge */}
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-white/40 text-[0.65rem]" style={{ fontFamily: body, fontWeight: 500 }}>Google</span>
                  </div>
                </div>
                <p className="text-white/85 mb-5 leading-relaxed flex-1" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.9rem" }}>
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="w-9 h-9 bg-[#FD9F26] rounded-xl flex items-center justify-center text-white text-xs shadow-md" style={{ fontFamily: heading, fontWeight: 700 }}>
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-white text-sm" style={{ fontFamily: body, fontWeight: 600 }}>{review.name}</p>
                    <p className="text-white/45 text-xs mt-0.5" style={{ fontFamily: body, fontWeight: 400 }}>{review.published}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA to leave a review */}
        <ScrollReveal delay={400}>
          <div className="text-center mt-12">
            <a
              href={reviewData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/8 hover:bg-white/15 text-white rounded-full transition-all duration-300 border border-white/15 hover:border-white/25 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              Bekijk alle reviews op Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
