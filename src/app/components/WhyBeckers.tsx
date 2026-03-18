import { Heart, Clock, Car, TrendingUp, UserCheck, Smartphone } from "lucide-react";
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
    description: "Lessen op doordeweekse dagen, 's avonds of op zaterdag. Jij kiest wat het beste uitkomt.",
  },
  {
    icon: Car,
    title: "Moderne lesauto (schakel)",
    description: "Leer rijden in een comfortabele, moderne lesauto met schakelbak en de nieuwste veiligheidsvoorzieningen.",
  },
  {
    icon: TrendingUp,
    title: "Hoge slagingskans",
    description: "Dankzij onze gestructureerde, opbouwende aanpak behalen onze leerlingen een bovengemiddeld slagingspercentage.",
  },
  {
    icon: Smartphone,
    title: "Rijschoolsoftware \"On My Way\"",
    description: "Plan zelf je rijlessen in en bekijk je voortgang via de \"On My Way\" app. Altijd overzicht over je opleiding.",
  },
];

export function WhyBeckers() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#FD9F26] bg-[#FD9F26]/10 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Waarom Beckers?
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              Waarom kiezen voor Verkeersschool Beckers?
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
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1956E3] to-[#1956E3] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#1956E3]/15 transition-transform duration-400 group-hover:scale-110 group-hover:-translate-y-1">
                    <Icon className="w-7 h-7 text-white" />
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
