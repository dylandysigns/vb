import { Heart, Clock, Car, UserCheck, Smartphone } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const benefits = [
  {
    icon: UserCheck,
    title: "Persoonlijke begeleiding",
    description: "Iedere leerling is uniek. Wij stemmen de lessen af op jouw leerstijl en tempo.",
  },
  {
    icon: Heart,
    title: "Familiebedrijf sinds 2007",
    description: "Opgericht door Danny Beckers en voortgezet door zoons Mitchell en Rodney. Persoonlijk contact staat centraal.",
  },
  {
    icon: Clock,
    title: "Flexibele lestijden",
    description: "Onze lestijden zijn ma t/m do 8:00-16:30 en 18:00-20:00 en vrijdag 8:00-13:30.",
  },
  {
    icon: Car,
    title: "Moderne lesauto (schakel)",
    description: "Leer rijden in een comfortabele, moderne lesauto met schakelbak en de nieuwste veiligheidsvoorzieningen.",
  },
  {
    icon: Smartphone,
    title: "Rijschoolsoftware \"On My Way\"",
    description: "Plan zelf je rijlessen in en bekijk je voortgang via de \"On My Way\" app. Altijd overzicht over je opleiding.",
  },
  {
    icon: Car,
    title: "Deskundige instructeurs",
    description: "Wij zijn altijd up-to-date van de laatste ontwikkelingen en bijscholingen.",
  },
];

export function WhyBeckers() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Waarom Beckers?
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              Waarom kiezen voor onze rijschool?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
              Wij geloven dat leren rijden een positieve ervaring moet zijn. Dit is wat ons onderscheidt.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={benefit.title} delay={i * 80}>
                <div className="text-center group flex h-full flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1956E3] to-[#1956E3] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#1956E3]/15 transition-transform duration-400 group-hover:scale-110 group-hover:-translate-y-1">
                    <span className="flex h-full w-full items-center justify-center">
                      <Icon className="block w-7 h-7 text-white" strokeWidth={2.2} />
                    </span>
                  </div>
                  <h3
                    className="text-gray-900 mb-2.5 tracking-tight"
                    style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.1rem" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed max-w-xs mx-auto" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.9rem" }}>
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
