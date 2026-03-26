import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";

const heroImage = "https://images.unsplash.com/photo-1630406144797-821be1f35d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcml2aW5nJTIwbGVzc29uJTIwY2FyJTIwc3R1ZGVudCUyMGluc3RydWN0b3J8ZW58MXx8fHwxNzczMTc2NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden"
      style={{ background: "linear-gradient(145deg, #1956E3 0%, #1956E3 40%, #1956E3 100%)" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(11,61,145,0.3) 0%, transparent 70%)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1 text-white z-10">
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 mb-8">
                <span className="w-2 h-2 bg-[#FD9F26] rounded-full animate-pulse" />
                <span style={{ fontFamily: body, fontWeight: 500, fontSize: "0.85rem" }} className="text-white/90 tracking-wide">
                  Meer dan 500 leerlingen geslaagd
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1
                className="text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] !leading-[1.1] mb-6 tracking-tight"
                style={{ fontFamily: heading, fontWeight: 800 }}
              >
                Zelfverzekerd op weg naar jouw{" "}
                <span className="relative inline-block">
                  <span className="text-[#FD9F26]">rijbewijs</span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FD9F26]/40 rounded-full" />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <p className="text-lg text-white/75 max-w-lg mb-8 leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
                Bij Verkeersschool Beckers — een familiebedrijf sinds 2007 — leer je rijden in een ontspannen sfeer
                met persoonlijke begeleiding. Wij helpen je stap voor stap richting een veilige en zelfverzekerde rijstijl.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={450}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#proefles"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FD9F26] hover:bg-[#FD9F26] text-white rounded-full transition-all duration-300 shadow-lg shadow-[#FD9F26]/25 hover:shadow-xl hover:shadow-[#FD9F26]/35 hover:-translate-y-1 active:translate-y-0"
                  style={{ fontFamily: body, fontWeight: 600, fontSize: "1rem" }}
                  onClick={(e) => { e.preventDefault(); document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Proefles aanvragen
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#tarieven"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/8 hover:bg-white/15 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/15 hover:border-white/30"
                  style={{ fontFamily: body, fontWeight: 500 }}
                  onClick={(e) => { e.preventDefault(); document.querySelector("#tarieven")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                  Bekijk tarieven
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={550}>
              <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm" style={{ fontFamily: body }}>
                <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 text-[#FD9F26]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={{ fontWeight: 500 }}>5/5 sterren op Google</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right image */}
          <ScrollReveal className="order-1 lg:order-2" direction="right" delay={400} distance={60}>
            <div className="relative z-10 block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 group">
                <ImageWithFallback
                  src={heroImage}
                  alt="Rijles bij Verkeersschool Beckers"
                  className="w-full h-[340px] sm:h-[420px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1956E3]/50 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div
                className="absolute -bottom-4 left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl transition-transform duration-500 hover:-translate-y-1 max-w-[calc(100%-2rem)] sm:max-w-none"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-xl bg-gradient-to-br from-[#FD9F26] to-[#FD9F26] shadow-lg shadow-[#FD9F26]/20 sm:h-12 sm:w-12">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.9rem" }}>Flexibele lestijden</p>
                    <p className="text-gray-500 leading-snug" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.78rem" }}>Ma t/m do 8:00-16:30 en 18:00-20:00, vr 8:00-13:30</p>
                  </div>
                </div>
              </div>

              {/* Second floating card */}
              <div
                className="absolute top-4 right-4 sm:-top-3 sm:-right-3 bg-white rounded-2xl p-4 shadow-2xl transition-transform duration-500 hover:-translate-y-1"
                style={{ animation: "float 7s ease-in-out infinite reverse" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1956E3] to-[#1956E3] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm leading-snug" style={{ fontFamily: heading, fontWeight: 700 }}>Betalen in 2 maandelijkse termijnen</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-[-1px] left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" className="block w-full h-auto">
          <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  );
}
