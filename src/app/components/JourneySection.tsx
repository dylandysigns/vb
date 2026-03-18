import { Sparkles, Award, Shield } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const journeys = [
  {
    icon: Sparkles,
    title: "Net begonnen",
    subtitle: "Eerste keer achter het stuur?",
    description:
      "We beginnen rustig en bouwen stap voor stap je vaardigheden op. Van koppeling en schakelen tot zelfstandig rijden in het verkeer. Alles op jouw tempo.",
    features: ["Kennismakingsles", "Basisvaardigheden", "Verkeersregels in de praktijk"],
    gradient: "from-[#1956E3] to-[#1956E3]",
    accentColor: "#1956E3",
  },
  {
    icon: Award,
    title: "Bijna klaar voor examen",
    subtitle: "De laatste stappen naar je rijbewijs",
    description:
      "Je rijdt al goed, maar het examen vraagt net iets meer. Wij bereiden je gericht voor met examenroutes, speciale verrichtingen en tips voor de grote dag.",
    features: ["Examenroutes oefenen", "Speciale verrichtingen", "Stressbestendig rijden"],
    gradient: "from-[#FD9F26] to-[#FD9F26]",
    accentColor: "#FD9F26",
  },
  {
    icon: Shield,
    title: "Meer vertrouwen nodig",
    subtitle: "Rijbewijs al in de pocket?",
    description:
      "Al een tijdje niet gereden of onzeker op de snelweg? Onze opfrislessen helpen je om weer veilig en ontspannen de weg op te gaan.",
    features: ["Opfrislessen", "Snelwegtraining", "Angstbegeleiding"],
    gradient: "from-[#1956E3] to-[#1956E3]",
    accentColor: "#1956E3",
  },
];

export function JourneySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Jouw traject
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              Waar sta jij op dit moment?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
              Iedereen heeft een ander startpunt. Wij passen onze aanpak aan op jouw situatie.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {journeys.map((journey, i) => {
            const Icon = journey.icon;
            return (
              <ScrollReveal key={journey.title} delay={i * 120}>
                <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group h-full hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${journey.gradient} shadow-lg transition-transform duration-400 group-hover:scale-110`}
                    style={{ boxShadow: `0 8px 20px ${journey.accentColor}20` }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-1.5 tracking-tight" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.2rem" }}>
                    {journey.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: journey.accentColor, fontFamily: body, fontWeight: 600 }}>
                    {journey.subtitle}
                  </p>
                  <p className="text-gray-500 mb-6 leading-relaxed" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.9rem" }}>
                    {journey.description}
                  </p>
                  <ul className="space-y-2.5">
                    {journey.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-gray-600" style={{ fontFamily: body, fontSize: "0.85rem" }}>
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${journey.accentColor}12` }}>
                          <svg className="w-3 h-3 flex-shrink-0" style={{ color: journey.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}