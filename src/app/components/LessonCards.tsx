import { useState } from "react";
import { Car, X, ArrowRight, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

interface Lesson {
  icon: LucideIcon;
  title: string;
  description: string;
  modalTitle: string;
  modalContent: string[];
  modalHighlights: string[];
  pricingTabId: string;
  pricingTabLabel: string;
}

function TrailerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3.3 8.6h13.9c.8 0 1.4.6 1.4 1.4v4.7c0 .8-.6 1.4-1.4" />
      <path d="M3.3 8.6c-.8 0-1.4.6-1.4 1.4v4.7c0 .8.6 1.4 1.4 1.4h1" />
      <path d="M9.2 16.1h3" />
      <path d="M18.6 14.9h3.3" />
      <circle cx="6.8" cy="16.1" r="2.2" />
      <circle cx="15.8" cy="16.1" r="2.2" />
    </svg>
  );
}

const lessons: Lesson[] = [
  {
    icon: Car,
    title: "Auto (Rijbewijs B)",
    description: "Rijopleiding opgebouwd in fases, op een manier die voor jou het beste werkt. Duidelijk, opbouwend en afgestemd op jouw leerniveau.",
    modalTitle: "Autorijlessen (Rijbewijs B)",
    modalContent: [
      "Onze rijopleiding is opgebouwd in fases en wordt gegeven op een manier die voor jou het beste werkt. De lessen zijn duidelijk, opbouwend en volledig afgestemd op jouw leerniveau.",
      "Via de rijschoolsoftware \"On My Way\" kun je zelf jouw rijlessen inplannen en je voortgang inzien. Zo heb je altijd overzicht en plan je je lessen wanneer het jou het beste uitkomt.",
      "De lessen vinden plaats in de regio Zaltbommel en omgeving, zodat je vertrouwd raakt met diverse verkeerssituaties. Je leert rijden in een moderne, comfortabele lesauto met schakelbak.",
    ],
    modalHighlights: ["Duidelijk en opbouwend", "Op jouw leerniveau", "Rijschoolsoftware \"On My Way\"", "Lessen zelf inplannen", "Voortgang inzien", "Flexibele lestijden"],
    pricingTabId: "rijlessen",
    pricingTabLabel: "Bekijk tarieven autorijlessen",
  },
  {
    icon: TrailerIcon,
    title: "Aanhanger (Rijbewijs BE)",
    description: "Nodig wanneer de combinatie auto + aanhanger zwaarder is dan 3500 kg. Dagcursus beschikbaar met les en examen op dezelfde dag.",
    modalTitle: "Aanhanger (Rijbewijs BE)",
    modalContent: [
      "Een BE-rijbewijs is nodig wanneer de combinatie van auto en aanhanger zwaarder is dan 3500 kg.",
      "Met een BE-rijbewijs mag je een aanhanger van maximaal 3500 kg trekken, de totale combinatie mag maximaal 7000 kg wegen.",
      "Wij bieden een efficiënte dagcursus aan: 6 uur les plus het praktijkexamen, allemaal op dezelfde dag. Zo heb je in één dag je BE-rijbewijs in handen.",
      "Heb je meer oefentijd nodig? Extra lessen zijn altijd mogelijk. Wij stemmen het traject af op jouw ervaring en wensen.",
    ],
    modalHighlights: ["Dagcursus (6 uur + examen)", "Les en examen op een dag", "Max. 3500 kg aanhanger", "Extra lessen mogelijk", "Snel je BE-rijbewijs", "Praktische begeleiding"],
    pricingTabId: "aanhanger",
    pricingTabLabel: "Bekijk aanhanger tarieven",
  },
];

export function LessonCards() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const scrollToPricingTab = (tabId: string) => {
    setSelectedLesson(null);
    setTimeout(() => {
      // Dispatch custom event to switch pricing tab
      window.dispatchEvent(new CustomEvent("switch-pricing-tab", { detail: tabId }));
      const el = document.querySelector("#tarieven");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      <section id="rijlessen" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
                style={{ fontFamily: body, fontWeight: 600 }}
              >
                Onze opleidingen
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
                style={{ fontFamily: heading, fontWeight: 800 }}
              >
                Welke rijopleiding heb jij nodig?
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
                Wij bieden twee opleidingen aan: autorijlessen (rijbewijs B) en aanhangerrijlessen (rijbewijs BE). Klik op een opleiding voor meer informatie.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {lessons.map((lesson, i) => {
              const Icon = lesson.icon;
              return (
                <ScrollReveal key={lesson.title} delay={i * 120} className="h-full">
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className="w-full h-full text-left bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 border border-gray-100 group cursor-pointer hover:-translate-y-1.5 active:translate-y-0 flex flex-col"
                  >
                    <div className="w-16 h-16 bg-[#1956E3]/8 group-hover:bg-gradient-to-br group-hover:from-[#1956E3] group-hover:to-[#1956E3] rounded-2xl flex items-center justify-center mb-6 transition-all duration-400 flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#1956E3] group-hover:text-white transition-colors duration-400" />
                    </div>
                    <h3 className="text-gray-900 mb-3 tracking-tight flex-shrink-0" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.2rem" }}>
                      {lesson.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed flex-1" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.92rem" }}>
                      {lesson.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[#1956E3] group-hover:text-[#FD9F26] transition-colors duration-300 mt-6 flex-shrink-0"
                      style={{ fontFamily: body, fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      Meer informatie
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Modal */}
      {selectedLesson && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
          onClick={() => setSelectedLesson(null)}
        >
          <button
            type="button"
            aria-label="Sluit popup"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            style={{ animation: "lessonFadeIn 300ms ease-out" }}
            onClick={() => setSelectedLesson(null)}
          />
          <div
            className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl"
            style={{ animation: "lessonSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 sm:px-7 pt-4 sm:pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-gradient-to-br from-[#1956E3] to-[#1956E3] rounded-xl flex items-center justify-center shadow-md">
                  <selectedLesson.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-900 tracking-tight" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.15rem" }}>
                  {selectedLesson.modalTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 -mr-1"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-7 py-6 space-y-5">
              {selectedLesson.modalContent.map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed" style={{ fontFamily: body, fontWeight: 400, fontSize: "0.95rem" }}>
                  {paragraph}
                </p>
              ))}

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {selectedLesson.modalHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-3">
                    <svg className="w-4 h-4 text-[#FD9F26] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700" style={{ fontFamily: body, fontWeight: 500, fontSize: "0.8rem" }}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <button
                onClick={() => scrollToPricingTab(selectedLesson.pricingTabId)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-[#FD9F26] to-[#FD9F26] hover:from-[#FD9F26] hover:to-[#FD9F26] text-white rounded-xl transition-all duration-300 hover:shadow-lg shadow-lg shadow-[#FD9F26]/20 group/cta"
                style={{ fontFamily: body, fontWeight: 600 }}
              >
                {selectedLesson.pricingTabLabel}
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-y-0.5" />
              </button>

              <button
                onClick={() => {
                  setSelectedLesson(null);
                  setTimeout(() => document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-[#1956E3]/30 text-gray-500 hover:text-[#1956E3] bg-transparent hover:bg-[#1956E3]/5 rounded-xl transition-all duration-300"
                style={{ fontFamily: body, fontWeight: 600 }}
              >
                Direct aanvragen
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes lessonFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lessonSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </>
  );
}
