import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const steps = [
  { number: "01", title: "Vraag een proefles aan", description: "Vul het formulier in of bel ons. We plannen samen een kennismakingsles in.", icon: "📞" },
  { number: "02", title: "Maak samen een lesplan", description: "Na de proefles stellen we een persoonlijk lesplan op dat past bij jouw niveau en doelen.", icon: "📋" },
  { number: "03", title: "Oefen gericht in de lesauto", description: "Stap voor stap bouw je je rijvaardigheden op met gerichte oefening en feedback.", icon: "🚗" },
  { number: "04", title: "Ga vol vertrouwen naar je examen", description: "Als je er klaar voor bent, begeleiden we je naar je praktijkexamen. Met vertrouwen op pad!", icon: "🎓" },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#FD9F26] bg-[#FD9F26]/10 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Hoe werkt het?
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              In 4 stappen naar je rijbewijs
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
              Het traject bij Verkeersschool Beckers is helder en overzichtelijk. Zo weet je altijd waar je aan toe bent.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[12%] right-[12%] h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #1956E3 10%, #1956E3 90%, transparent)" , opacity: 0.12 }}
          />

          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 120}>
              <div className="relative text-center group">
                <div className="relative z-10 w-[4.5rem] h-[4.5rem] bg-gradient-to-br from-[#1956E3] to-[#1956E3] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#1956E3]/15 transition-all duration-400 group-hover:scale-110 group-hover:shadow-xl group-hover:-translate-y-1">
                  <span className="text-white text-xl" style={{ fontFamily: heading, fontWeight: 800 }}>{step.number}</span>
                </div>
                <h3
                  className="text-gray-900 mb-2.5 tracking-tight"
                  style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.05rem" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.875rem" }}>
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
