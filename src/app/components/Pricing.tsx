import { useState, useEffect, useRef, useCallback } from "react";
import { Check, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

/* ===== Front-facing cards (packages first, then key services) ===== */
const cards = [
  {
    id: "30-uur-pakket",
    name: "30 Uur Pakket",
    price: "2.580",
    description: "Inclusief TTT + praktijkexamen",
    highlight: "€ 80,- korting",
    features: ["30 rijlessen (60 min.)", "Tussentijdse toets (TTT)", "Praktijkexamen B inbegrepen"],
    popular: false,
  },
  {
    id: "35-uur-pakket",
    name: "35 Uur Pakket",
    price: "2.925",
    description: "Inclusief TTT + praktijkexamen",
    highlight: "€ 85,- korting",
    features: ["35 rijlessen (60 min.)", "Tussentijdse toets (TTT)", "Praktijkexamen B inbegrepen"],
    popular: true,
  },
  {
    id: "40-uur-pakket",
    name: "40 Uur Pakket",
    price: "3.270",
    description: "Inclusief TTT + praktijkexamen",
    highlight: "€ 90,- korting",
    features: ["40 rijlessen (60 min.)", "Tussentijdse toets (TTT)", "Praktijkexamen B inbegrepen"],
    popular: false,
  },
  {
    id: "be-dagcursus",
    name: "Aanhanger Dagcursus",
    price: "700",
    description: "6 uur les + praktijkexamen",
    highlight: "Rijbewijs BE",
    features: ["6 uur rijles", "Praktijkexamen BE inbegrepen", "Les en examen op dezelfde dag"],
    popular: false,
  },
];

const quickPrices = [
  { id: "proefles", label: "Proefles + advies", price: "€ 60,-" },
  { id: "losse-les-60", label: "Losse les (60 min.)", price: "€ 70,-" },
  { id: "losse-les-90", label: "Losse les (90 min.)", price: "€ 105,-" },
];

/* ===== Modal tabs data ===== */
const tabs = [
  {
    id: "rijlessen",
    label: "Autorijlessen",
    items: [
      { name: "Proefles + advies*", price: "€ 60,-" },
      { name: "Losse les (60 min.)", price: "€ 70,-" },
      { name: "Losse les (90 min.)", price: "€ 105,-" },
    ],
    note: "* De proefles is niet gratis",
  },
  {
    id: "pakketten",
    label: "Pakketten",
    items: [
      { name: "30 uur les incl. TTT + praktijkexamen", price: "€ 2.580,-", note: "€ 80,- korting" },
      { name: "35 uur les incl. TTT + praktijkexamen", price: "€ 2.925,-", note: "€ 85,- korting" },
      { name: "40 uur les incl. TTT + praktijkexamen", price: "€ 3.270,-", note: "€ 90,- korting" },
      { name: "Dagcursus BE (6 uur les + praktijkexamen)", price: "€ 700,-" },
    ],
    note: "Betalen in 2 maandelijkse termijnen is in overleg mogelijk",
  },
  {
    id: "examens",
    label: "Examens",
    items: [
      { name: "Praktijkexamen B", price: "€ 300,-" },
      { name: "Tussentijdse toets (TTT)", price: "€ 260,-" },
      { name: "Faalangstexamen B", price: "€ 320,-" },
      { name: "BNOR examen", price: "€ 320,-" },
    ],
  },
  {
    id: "aanhanger",
    label: "Aanhanger BE",
    items: [
      { name: "Dagcursus BE (6 uur les + praktijkexamen)", price: "€ 700,-" },
      { name: "Losse les (60 min.)", price: "€ 75,-" },
      { name: "Praktijkexamen BE", price: "€ 300,-" },
    ],
  },
];

/* Detect mobile viewport */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rijlessen");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  useIsMobile();

  // Listen for tab switch events from LessonCards
  useEffect(() => {
    const handler = (e: Event) => {
      const tabId = (e as CustomEvent).detail;
      setActiveTab(tabId);
      setModalOpen(true);
    };
    window.addEventListener("switch-pricing-tab", handler);
    return () => window.removeEventListener("switch-pricing-tab", handler);
  }, []);

  // Check tab scroll state
  const checkTabScroll = useCallback(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    // Wait for render
    const t = setTimeout(checkTabScroll, 100);
    return () => clearTimeout(t);
  }, [modalOpen, checkTabScroll]);

  const scrollTabsBy = (direction: number) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 120, behavior: "smooth" });
  };

  return (
    <>
      <section id="tarieven" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
                style={{ fontFamily: body, fontWeight: 600 }}
              >
                Tarieven
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
                style={{ fontFamily: heading, fontWeight: 800 }}
              >
                Transparante tarieven, geen verrassingen
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
                Bekijk eenvoudig alle tarieven. Betalen in 2 maandelijkse termijnen is in overleg mogelijk.
              </p>
            </div>
          </ScrollReveal>

          {/* Package cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            {cards.map((pkg, i) => {
              return (
                <ScrollReveal key={pkg.name} delay={i * 100} className="h-full">
                  <div
                    onClick={() => {
                      setActiveTab(pkg.id === "be-dagcursus" ? "aanhanger" : "pakketten");
                      setModalOpen(true);
                    }}
                    className={`relative rounded-3xl p-8 transition-all duration-400 h-full cursor-pointer flex flex-col ${
                      pkg.popular
                        ? "bg-gradient-to-br from-[#1956E3] to-[#1956E3] text-white shadow-2xl shadow-[#1956E3]/20 ring-2 ring-[#FD9F26] scale-[1.03] z-10 hover:scale-[1.04]"
                        : "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    {pkg.popular && (
                      <span
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FD9F26] to-[#FD9F26] text-white text-xs px-5 py-1.5 rounded-full shadow-lg"
                        style={{ fontFamily: body, fontWeight: 600, letterSpacing: "0.02em" }}
                      >
                        Meest gekozen
                      </span>
                    )}

                    <h3 className={`mb-1 tracking-tight ${pkg.popular ? "text-white" : "text-gray-900"}`}
                      style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.2rem" }}
                    >
                      {pkg.name}
                    </h3>
                    <p className={`text-sm mb-6 ${pkg.popular ? "text-white/60" : "text-gray-400"}`} style={{ fontFamily: body }}>
                      {pkg.description}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-sm" style={{ fontWeight: 500 }}>€</span>
                      <span className="text-[2.5rem] tracking-tight" style={{ fontFamily: heading, fontWeight: 800, lineHeight: 1 }}>
                        {pkg.price}
                      </span>
                    </div>
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full mb-6 ${
                        pkg.popular ? "bg-[#FD9F26]/20 text-[#FD9F26]" : "bg-green-50 text-green-600"
                      }`}
                      style={{ fontFamily: body, fontWeight: 600 }}
                    >
                      {pkg.highlight}
                    </span>

                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.popular ? "text-[#FD9F26]" : "text-[#1956E3]"}`} />
                          <span className={pkg.popular ? "text-white/85" : "text-gray-600"} style={{ fontFamily: body, fontWeight: 400 }}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Quick prices bar — entire block is clickable to open modal */}
          <ScrollReveal delay={300}>
            <div
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-300 group/block"
              onClick={() => setModalOpen(true)}
            >
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {quickPrices.map((qp) => {
                    return (
                      <button
                        key={qp.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab("rijlessen");
                          setModalOpen(true);
                        }}
                        className="flex flex-col items-center justify-center gap-1 rounded-xl border border-transparent px-4 py-3 text-center transition-all duration-300 group/qp hover:border-[#1956E3]/10 hover:bg-[#1956E3]/5"
                      >
                        <span className="text-sm text-gray-500" style={{ fontFamily: body, fontWeight: 400 }}>
                          {qp.label}
                        </span>
                        <span className="text-[#1956E3]" style={{ fontFamily: heading, fontWeight: 700 }}>
                          {qp.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center border-t border-gray-100 pt-4 text-center">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[#1956E3] group-hover/block:text-[#FD9F26] transition-colors duration-300 whitespace-nowrap"
                    style={{ fontFamily: body, fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    Alle tarieven bekijken
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/block:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Pricing Modal with Tabs ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setModalOpen(false)}>
          <button
            type="button"
            aria-label="Sluit popup"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            style={{ animation: "pricingFadeIn 300ms ease-out" }}
            onClick={() => setModalOpen(false)}
          />
          <div
            className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
            style={{ animation: "pricingSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle for mobile */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Modal header */}
            <div className="px-5 sm:px-7 pt-4 sm:pt-7 pb-0 flex items-start justify-between">
              <div>
                <h3 className="text-gray-900 tracking-tight mb-1" style={{ fontFamily: heading, fontWeight: 800, fontSize: "1.4rem" }}>
                  Alle tarieven
                </h3>
                <p className="text-gray-400 text-sm" style={{ fontFamily: body }}>Verkeersschool Beckers, overzicht van al onze prijzen</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Tabs with scroll indicators on mobile */}
            <div className="px-5 sm:px-7 pt-5 pb-0 relative">
              {/* Left scroll fade */}
              {canScrollLeft && (
                <button
                  onClick={() => scrollTabsBy(-1)}
                  className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 sm:hidden"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
              )}
              {/* Right scroll fade + hint */}
              {canScrollRight && (
                <div className="absolute right-0 top-5 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 flex items-center justify-end pr-1 sm:hidden pointer-events-none">
                  <div className="pointer-events-auto animate-pulse">
                    <ChevronRight className="w-5 h-5 text-[#1956E3]/50" />
                  </div>
                </div>
              )}
              <div
                ref={tabsContainerRef}
                className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide"
                onScroll={checkTabScroll}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-t-xl text-sm whitespace-nowrap transition-all duration-300 border-b-2 ${
                      activeTab === tab.id
                        ? "bg-[#1956E3]/8 text-[#1956E3] border-[#1956E3]"
                        : "text-gray-400 hover:text-gray-600 border-transparent hover:bg-gray-50"
                    }`}
                    style={{ fontFamily: body, fontWeight: activeTab === tab.id ? 600 : 500 }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6">
              {tabs.map((tab) => {
                if (tab.id !== activeTab) return null;
                return (
                  <div key={tab.id} style={{ animation: "pricingFadeIn 300ms ease-out" }}>
                    <div className="space-y-0">
                      {tab.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 -mx-3 px-3 rounded-lg transition-colors duration-200"
                        >
                          <div className="flex-1 pr-4">
                            <p className="text-gray-800" style={{ fontFamily: body, fontWeight: 500, fontSize: "0.95rem" }}>
                              {item.name}
                            </p>
                            {"note" in item && item.note && (
                              <span className="inline-block text-xs bg-green-50 text-green-600 px-2.5 py-0.5 rounded-full mt-1.5" style={{ fontFamily: body, fontWeight: 500 }}>
                                {item.note}
                              </span>
                            )}
                          </div>
                          <span className="text-[#1956E3] whitespace-nowrap" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1rem" }}>
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    {tab.note && (
                      <p className="text-gray-400 text-xs mt-5 italic leading-relaxed" style={{ fontFamily: body }}>
                        {tab.note}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal footer */}
            <div className="px-5 sm:px-7 py-5 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setTimeout(() => document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
                className="w-full block text-center py-3.5 bg-[#FD9F26] hover:bg-[#FD9F26] text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                style={{ fontFamily: body, fontWeight: 600 }}
              >
                Proefles aanvragen
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pricingFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pricingSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
