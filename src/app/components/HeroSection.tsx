import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";

const heroImage =
  "https://images.unsplash.com/photo-1630406144797-821be1f35d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2aW5nJTIwbGVzc29uJTIwY2FyJTIwc3R1ZGVudCUyMGluc3RydWN0b3J8ZW58MXx8fHwxNzczMTc2NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

function HeroMetaIcon({ icon }: { icon: "star" | "clock" | "check" }) {
  if (icon === "star") {
    return (
      <svg className="h-4 w-4 text-[#FD9F26]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }

  if (icon === "clock") {
    return (
      <svg className="h-4 w-4 text-[#FD9F26]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4 text-[#FD9F26]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden pt-[88px] lg:hidden"
        style={{ background: "linear-gradient(152deg, #0b3d91 6%, #082e6e 41%, #051a44 94%)" }}
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Rijles bij Verkeersschool Beckers"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(25, 86, 227, 1) 0%, rgba(25, 86, 227, 0.98) 22%, rgba(25, 86, 227, 0.9) 40%, rgba(25, 86, 227, 0.62) 58%, rgba(12, 44, 116, 0.78) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 24%, rgba(255,255,255,0) 56%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col px-4 sm:px-6">
          <div className="flex flex-1 items-center justify-center py-10 sm:py-14">
            <div className="mx-auto flex w-full max-w-[980px] flex-col items-center text-center">
              <ScrollReveal delay={80}>
                <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md sm:mb-8 sm:px-5 sm:py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FD9F26]" />
                  <span
                    className="text-sm tracking-[0.02em] text-white/95 sm:text-[0.95rem]"
                    style={{ fontFamily: body, fontWeight: 500 }}
                  >
                    Meer dan 500 leerlingen geslaagd
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <h1
                  className="max-w-[11ch] text-[2.7rem] leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.9rem]"
                  style={{ fontFamily: heading, fontWeight: 800 }}
                >
                  Zelfverzekerd op weg naar jouw{" "}
                  <span className="relative inline-block text-[#FD9F26]">
                    rijbewijs
                    <span className="absolute left-0 top-full mt-1.5 h-1.5 w-full rounded-full bg-[#f5a623]/42" />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <p
                  className="mt-6 max-w-[44rem] text-[1rem] leading-[1.8] text-white/88 sm:mt-7 sm:text-[1.12rem]"
                  style={{ fontFamily: body, fontWeight: 400 }}
                >
                  Bij Verkeersschool Beckers, een familiebedrijf sinds 2007, leer je rijden in een ontspannen sfeer
                  met persoonlijke begeleiding. Wij helpen je stap voor stap richting een veilige en zelfverzekerde rijstijl.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={320}>
                <div className="mt-8 flex w-full max-w-[760px] flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <a
                    href="#proefles"
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#FD9F26] px-8 py-4 text-white shadow-[0_10px_30px_rgba(245,166,35,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(245,166,35,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 sm:w-auto"
                    style={{ fontFamily: body, fontWeight: 600, fontSize: "1rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Proefles aanvragen
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#tarieven"
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/20 bg-white/12 px-8 py-4 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/18 hover:border-white/32 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 sm:w-auto"
                    style={{ fontFamily: body, fontWeight: 600 }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#tarieven")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Bekijk tarieven
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <div className="mt-4 inline-flex items-center gap-2 text-white/78">
                  <HeroMetaIcon icon="star" />
                  <span className="text-sm" style={{ fontFamily: body, fontWeight: 500 }}>
                    5/5 op Google
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={360}>
                <div className="mt-5 grid w-full max-w-[560px] gap-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-[#1f2a37] shadow-[0_20px_48px_rgba(15,23,42,0.14)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1956E3] to-[#1956E3]">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm leading-snug text-gray-900" style={{ fontFamily: heading, fontWeight: 700 }}>
                        Rijlessen voor auto en aanhanger
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 text-[#1f2a37] shadow-[0_20px_48px_rgba(15,23,42,0.14)]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FD9F26] to-[#FD9F26] shadow-lg shadow-[#FD9F26]/20">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.95rem" }}>
                        Flexibele lestijden
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-500" style={{ fontFamily: body, fontWeight: 400 }}>
                        Ma t/m do 8:00-16:30 en 18:00-20:00, vr 8:00-13:30
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={400}>
            <div className="pb-16 sm:pb-20">
              <div className="mx-auto h-px max-w-[960px] bg-transparent" />
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-[-1px] left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" className="block w-full h-auto">
            <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      <section
        id="home-desktop"
        className="relative hidden min-h-screen items-center overflow-hidden pt-[72px] lg:flex"
        style={{ background: "linear-gradient(145deg, #1956E3 0%, #1956E3 40%, #1956E3 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(11,61,145,0.3) 0%, transparent 70%)",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
              animation: "float 12s ease-in-out infinite",
            }}
          />
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.05); }
          }
        `}</style>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="z-10 text-white">
              <ScrollReveal delay={100}>
                <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#FD9F26] animate-pulse" />
                  <span style={{ fontFamily: body, fontWeight: 500, fontSize: "0.85rem" }} className="tracking-wide text-white/90">
                    Meer dan 500 leerlingen geslaagd
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h1
                  className="mb-6 text-[3.75rem] !leading-[1.1] tracking-tight"
                  style={{ fontFamily: heading, fontWeight: 800 }}
                >
                  Zelfverzekerd op weg naar jouw{" "}
                  <span className="relative inline-block">
                    <span className="text-[#FD9F26]">rijbewijs</span>
                    <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#FD9F26]/40" />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/75" style={{ fontFamily: body, fontWeight: 400 }}>
                  Bij Verkeersschool Beckers, een familiebedrijf sinds 2007, leer je rijden in een ontspannen sfeer
                  met persoonlijke begeleiding. Wij helpen je stap voor stap richting een veilige en zelfverzekerde rijstijl.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <div className="mb-10 flex gap-4">
                  <a
                    href="#proefles"
                    className="inline-flex items-center justify-center rounded-full bg-[#FD9F26] px-8 py-4 text-white shadow-lg shadow-[#FD9F26]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FD9F26]/35"
                    style={{ fontFamily: body, fontWeight: 600, fontSize: "1rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Proefles aanvragen
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#tarieven"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-8 py-4 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                    style={{ fontFamily: body, fontWeight: 500 }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#tarieven")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Bekijk tarieven
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={550}>
                <div className="flex flex-wrap items-center gap-6 text-sm text-white/60" style={{ fontFamily: body }}>
                  <div className="flex items-center gap-2.5 rounded-full bg-white/5 px-4 py-2">
                    <svg className="h-4 w-4 text-[#FD9F26]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span style={{ fontWeight: 500 }}>5/5 sterren op Google</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal className="order-1 lg:order-2" direction="right" delay={400} distance={60}>
              <div className="relative z-10 block">
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-black/30">
                  <ImageWithFallback
                    src={heroImage}
                    alt="Rijles bij Verkeersschool Beckers"
                    className="h-[520px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1956E3]/50 via-transparent to-transparent" />
                </div>

                <div
                  className="absolute -bottom-5 -left-5 flex max-w-none items-start gap-3.5 rounded-2xl bg-white p-5 shadow-2xl transition-transform duration-500 hover:-translate-y-1"
                  style={{ animation: "float 6s ease-in-out infinite" }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-xl bg-gradient-to-br from-[#FD9F26] to-[#FD9F26] shadow-lg shadow-[#FD9F26]/20">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.9rem" }}>
                      Flexibele lestijden
                    </p>
                    <p className="leading-snug text-gray-500" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.78rem" }}>
                      Ma t/m do 8:00-16:30 en 18:00-20:00, vr 8:00-13:30
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -top-3 -right-3 mt-0 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl transition-transform duration-500 hover:-translate-y-1"
                  style={{ animation: "float 7s ease-in-out infinite reverse" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1956E3] to-[#1956E3]">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm leading-snug text-gray-900" style={{ fontFamily: heading, fontWeight: 700 }}>
                      Rijlessen voor auto en aanhanger
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[-1px] left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="block h-auto w-full">
            <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>
    </>
  );
}
