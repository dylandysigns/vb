import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import aboutImage from "../../assets/familybeckers.jpg";
import visualLogo from "../../assets/beckers-logo.png";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const highlights = [
  "Familiebedrijf met hart voor het vak",
  "Opgericht in 2007 door Danny Beckers",
  "Voortgezet door zoons Mitchell en Rodney",
  "Aanbod: auto (schakel) en aanhanger (BE)",
  "Persoonlijke begeleiding op jouw tempo",
];

export function AboutSection() {
  return (
    <section id="over-ons" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ScrollReveal direction="left" distance={50}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl group">
                <ImageWithFallback
                  src={aboutImage}
                  alt="Het team van Verkeersschool Beckers"
                  className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 lg:-top-5 lg:-left-5 flex items-center justify-center p-2 sm:p-3">
                <img src={visualLogo} alt="Beckers beeldmerk" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain" />
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#1956E3] text-white rounded-2xl p-6 shadow-2xl">
                <p className="text-3xl tracking-tight" style={{ fontFamily: heading, fontWeight: 800 }}>Sinds</p>
                <p className="text-4xl text-[#FD9F26] tracking-tight" style={{ fontFamily: heading, fontWeight: 800 }}>2007</p>
                <p className="text-white/70 text-sm mt-0.5" style={{ fontFamily: body, fontWeight: 400 }}>Familiebedrijf</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <div>
            <ScrollReveal direction="right" distance={40}>
              <span
                className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
                style={{ fontFamily: body, fontWeight: 600 }}
              >
                Over ons
              </span>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100}>
              <h2
                className="text-3xl sm:text-4xl text-gray-900 mb-6 tracking-tight"
                style={{ fontFamily: heading, fontWeight: 800 }}
              >
                Een familiebedrijf met passie voor rijlessen
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <p className="text-gray-500 text-lg mb-5 leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
                Verkeersschool Beckers is in 2007 opgericht door onze vader, Danny Beckers.
                Inmiddels is het bedrijf overgenomen door zijn zoons Mitchell en Rodney Beckers,
                die de rijschool met dezelfde passie en toewijding voortzetten.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <p className="text-gray-500 mb-8 leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
                Als familiebedrijf staat persoonlijk contact centraal. Wij bieden rijlessen voor
                de auto (schakel) en de aanhanger. Bij ons krijg je eerlijk advies, les op jouw
                niveau en een opleiding die bij jou past.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <ul className="space-y-3.5 mb-10">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 group/item">
                    <div className="w-6 h-6 bg-[#FD9F26]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 group-hover/item:bg-[#FD9F26]">
                      <svg className="w-3.5 h-3.5 text-[#FD9F26] transition-colors duration-300 group-hover/item:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.95rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500}>
              <a
                href="#proefles"
                className="inline-flex items-center px-8 py-4 bg-[#1956E3] hover:brightness-90 text-white rounded-full transition-all duration-300 shadow-lg shadow-[#1956E3]/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: body, fontWeight: 600 }}
                onClick={(e) => { e.preventDefault(); document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Maak kennis met ons
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
