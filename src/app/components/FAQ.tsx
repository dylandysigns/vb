import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const faqs = [
  { question: "Vanaf welke leeftijd kan ik beginnen met rijlessen?", answer: "Je mag in Nederland beginnen met autorijlessen vanaf 16,5 jaar. Je praktijkexamen mag je afleggen vanaf 17 jaar. Onder de 18 rijd je dan eerst met een begeleiderspas (2toDrive)." },
  { question: "Hoeveel rijlessen heb ik gemiddeld nodig?", answer: "Het landelijke gemiddelde ligt tussen de 40 en 45 lesuren. Dit verschilt per persoon, de een heeft meer tijd nodig dan de ander. Tijdens de proefles maken we een inschatting van het aantal lessen dat je nodig hebt." },
  { question: "Hoe vaak kan ik per week lessen?", answer: "Je kunt bij ons 1x per week lessen. We beginnen meestal met lessen van 1 uur. Later in de rijopleiding lessen we meestal 1,5 uur." },
  { question: "Wat zijn jullie lestijden?", answer: "Onze lestijden zijn maandag t/m donderdag van 8:00-16:30 en van 18:00-20:00. Op vrijdag lessen we van 8:00-13:30." },
  { question: "Hoe vraag ik een proefles aan?", answer: "Je kunt een proefles aanvragen via het formulier op onze website, door te bellen naar Mitchell (06 38 68 71 55) of Rodney (06 34 04 20 48), of via WhatsApp. We nemen snel contact met je op om een afspraak in te plannen." },
  { question: "Wat kost een rijles bij Verkeersschool Beckers?", answer: "Een losse rijles van 60 minuten kost € 70,-. We bieden ook voordelige lespakketten aan vanaf € 2.580,-. Bekijk onze tarievenpagina voor alle prijzen." },
  { question: "Wat houdt de proefles precies in?", answer: "Tijdens de proefles maak je kennis met de instructeur en de lesauto. Het doel van de proefles is vooral vertrouwen winnen. Wanneer je nog geen ervaring hebt met autorijden beginnen we slechts met het sturen, gas geven en richting aangeven. Vanuit daar bouwen we het verder op. Heb je al wel ervaring met autorijden, dan passen we het aan jouw niveau aan. Na de proefles geven we een eerlijk advies over het verwachte aantal lessen. De proefles kost €60,-." },
  { question: "Waar doen jullie praktijkexamens?", answer: "Onze praktijkexamens rijden wij in Tiel." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Veelgestelde vragen
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              Heb je nog vragen?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
              Hier vind je antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem gerust contact op.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 60}>
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-shadow duration-300 hover:shadow-md">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors duration-300"
                >
                  <span className="text-gray-900 pr-6" style={{ fontFamily: body, fontWeight: 600, fontSize: "0.95rem" }}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                    openIndex === index ? "bg-[#1956E3] rotate-180" : "bg-gray-100"
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${openIndex === index ? "text-white" : "text-gray-400"}`} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: openIndex === index ? "300px" : "0px",
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6 text-gray-500 leading-relaxed" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.9rem" }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
