import { useState, useEffect, useRef, useCallback } from "react";
import { Check, X, ArrowRight, ChevronRight, ArrowDown, Package, ChevronLeft } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { usePackage } from "./PackageContext";

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
    features: ["30 rijlessen (60 min.)", "Tussentijdse toets (TTT)", "Praktijkexamen B inbegrepen", "Persoonlijk lesplan"],
    popular: false,
  },
  {
    id: "35-uur-pakket",
    name: "35 Uur Pakket",
    price: "2.925",
    description: "Inclusief TTT + praktijkexamen",
    highlight: "€ 85,- korting",
    features: ["35 rijlessen (60 min.)", "Tussentijdse toets (TTT)", "Praktijkexamen B inbegrepen", "Persoonlijk lesplan"],
    popular: true,
  },
  {
    id: "40-uur-pakket",
    name: "40 Uur Pakket",
    price: "3.270",
    description: "Inclusief TTT + praktijkexamen",
    highlight: "€ 90,- korting",
    features: ["40 rijlessen (60 min.)", "Tussentijdse toets (TTT)", "Praktijkexamen B inbegrepen", "Persoonlijk lesplan"],
    popular: false,
  },
];

const quickPrices = [
  { id: "proefles", label: "Proefles + advies", price: "€ 60,-", formLabel: "Proefles + Advies (€ 60,-)" },
  { id: "losse-les-60", label: "Losse les (60 min.)", price: "€ 70,-", formLabel: "Losse Rijles 60 min. (€ 70,-)" },
  { id: "losse-les-90", label: "Losse les (90 min.)", price: "€ 105,-", formLabel: "Losse Rijles 90 min. (€ 105,-)" },
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
    ],
    note: "** Het is mogelijk om in overleg een pakket in 2 maandelijkse termijnen te betalen",
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
  const { selectedPackage, setSelectedPackage } = usePackage();
  const [showConfirmBar, setShowConfirmBar] = useState(false);
  const [confirmLabel, setConfirmLabel] = useState<string | null>(null);
  const [confirmBarKey, setConfirmBarKey] = useState(0);
  const confirmTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isMobile = useIsMobile();

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

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (confirmTimeout.current) clearTimeout(confirmTimeout.current);
    };
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

  const showSelectionBar = (label: string) => {
    setConfirmLabel(label);
    setShowConfirmBar(true);
    setConfirmBarKey((key) => key + 1);
    if (confirmTimeout.current) clearTimeout(confirmTimeout.current);
    // Longer on mobile: 8s vs 5s
    const duration = isMobile ? 8000 : 5000;
    confirmTimeout.current = setTimeout(() => setShowConfirmBar(false), duration);
  };

  const handleSelectPackage = (pkg: typeof cards[0]) => {
    const formLabel = `${pkg.name} (€ ${pkg.price},-)`;
    const alreadySelected = selectedPackage === formLabel;
    if (alreadySelected) {
      setSelectedPackage(null);
      setShowConfirmBar(false);
      return;
    }
    setSelectedPackage(formLabel);
    showSelectionBar(formLabel);
  };

  const handleSelectQuickPrice = (qp: typeof quickPrices[0]) => {
    const alreadySelected = selectedPackage === qp.formLabel;
    if (alreadySelected) {
      setSelectedPackage(null);
      setShowConfirmBar(false);
      return;
    }
    setSelectedPackage(qp.formLabel);
    showSelectionBar(qp.formLabel);
  };

  const scrollToForm = () => {
    setShowConfirmBar(false);
    setTimeout(() => document.querySelector("#proefles")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const scrollTabsBy = (direction: number) => {
    const el = tabsContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 120, behavior: "smooth" });
  };

  // Duration CSS variable for progress bar
  const progressDuration = isMobile ? "8s" : "5s";

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
                Kies het pakket dat bij jou past. Betaling in termijnen is in overleg mogelijk.
              </p>
            </div>
          </ScrollReveal>

          {/* Package cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {cards.map((pkg, i) => {
              const formLabel = `${pkg.name} (€ ${pkg.price},-)`;
              const isSelected = selectedPackage === formLabel;
              return (
                <ScrollReveal key={pkg.name} delay={i * 100} className="h-full">
                  <div
                    onClick={() => handleSelectPackage(pkg)}
                    className={`relative rounded-3xl p-8 transition-all duration-400 h-full cursor-pointer flex flex-col ${
                      pkg.popular
                        ? isSelected
                          ? "bg-gradient-to-br from-[#1956E3] to-[#1956E3] text-white shadow-2xl shadow-[#1956E3]/30 ring-[3px] ring-[#FD9F26] scale-[1.04] z-10"
                          : "bg-gradient-to-br from-[#1956E3] to-[#1956E3] text-white shadow-2xl shadow-[#1956E3]/20 ring-2 ring-[#FD9F26] scale-[1.03] z-10 hover:scale-[1.04]"
                        : isSelected
                          ? "bg-white border-2 border-[#1956E3] shadow-xl shadow-[#1956E3]/10 -translate-y-1.5"
                          : "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div
                        className="absolute top-4 right-4 w-8 h-8 bg-[#FD9F26] rounded-full flex items-center justify-center shadow-lg"
                        style={{ animation: "pricingPop 350ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                      >
                        <Check className="w-4.5 h-4.5 text-white" strokeWidth={3} />
                      </div>
                    )}

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

                    {/* Card CTA button */}
                    <div
                      className={`text-center py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-[#FD9F26] text-white shadow-lg shadow-[#FD9F26]/25"
                          : pkg.popular
                            ? "bg-[#FD9F26] hover:bg-[#FD9F26] text-white shadow-lg shadow-[#FD9F26]/20 hover:shadow-xl"
                            : "bg-[#1956E3] hover:bg-[#1956E3] text-white"
                      }`}
                      style={{ fontFamily: body, fontWeight: 600 }}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          Geselecteerd
                        </>
                      ) : (
                        "Dit pakket kiezen"
                      )}
                    </div>
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {quickPrices.map((qp) => {
                    const isActive = selectedPackage === qp.formLabel;
                    return (
                      <button
                        key={qp.id}
                        onClick={(e) => { e.stopPropagation(); handleSelectQuickPrice(qp); }}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 group/qp ${
                          isActive
                            ? "bg-[#1956E3] text-white shadow-md"
                            : "hover:bg-[#1956E3]/5 border border-transparent hover:border-[#1956E3]/10"
                        }`}
                      >
                        <span className={`text-sm ${isActive ? "text-white/70" : "text-gray-500"}`} style={{ fontFamily: body, fontWeight: 400 }}>
                          {qp.label}
                        </span>
                        <span className={isActive ? "text-white" : "text-[#1956E3]"} style={{ fontFamily: heading, fontWeight: 700 }}>
                          {qp.price}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#FD9F26] ml-0.5" />}
                        {!isActive && <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/qp:text-[#1956E3] transition-colors duration-200" />}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span
                    className="inline-flex items-center gap-2 text-[#1956E3] group-hover/block:text-[#FD9F26] transition-colors duration-300 whitespace-nowrap"
                    style={{ fontFamily: body, fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    Alle tarieven bekijken
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/block:translate-x-1" />
                  </span>
                  {selectedPackage && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedPackage(null); setShowConfirmBar(false); }}
                      className="text-gray-400 hover:text-gray-600 text-xs transition-colors duration-200"
                      style={{ fontFamily: body }}
                    >
                      Selectie wissen
                    </button>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Floating Selection Confirmation Bar ===== */}
      {showConfirmBar && confirmLabel && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-5 sm:pb-6 px-4 pointer-events-none">
          <div
            className="pointer-events-auto w-full max-w-lg"
            style={{ animation: "confirmSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden">
              {/* Progress bar */}
              <div
                key={confirmBarKey}
                className="h-1 bg-gradient-to-r from-[#FD9F26] to-[#FD9F26] rounded-t-full"
                style={{ animation: `confirmProgress ${progressDuration} linear forwards` }}
              />
              {/* Desktop layout */}
              <div className="hidden sm:flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FD9F26] to-[#FD9F26] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-[#FD9F26]/20">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm truncate" style={{ fontFamily: body, fontWeight: 600 }}>
                    {confirmLabel}
                  </p>
                  <p className="text-green-600 text-xs flex items-center gap-1" style={{ fontFamily: body, fontWeight: 500 }}>
                    <Check className="w-3 h-3" />
                    Pakket geselecteerd
                  </p>
                </div>
                <button
                  onClick={scrollToForm}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FD9F26] to-[#FD9F26] hover:from-[#FD9F26] hover:to-[#FD9F26] text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
                  style={{ fontFamily: body, fontWeight: 600, fontSize: "0.85rem" }}
                >
                  Naar aanvraag
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowConfirmBar(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              {/* Mobile layout — stacked for readability */}
              <div className="flex sm:hidden flex-col gap-3 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#FD9F26] to-[#FD9F26] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-[#FD9F26]/20">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-[0.9rem] leading-snug" style={{ fontFamily: body, fontWeight: 600 }}>
                      {confirmLabel}
                    </p>
                    <p className="text-green-600 text-xs flex items-center gap-1 mt-0.5" style={{ fontFamily: body, fontWeight: 500 }}>
                      <Check className="w-3 h-3" />
                      Pakket geselecteerd
                    </p>
                  </div>
                  <button
                    onClick={() => setShowConfirmBar(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0 self-start"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button
                  onClick={scrollToForm}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#FD9F26] to-[#FD9F26] active:from-[#FD9F26] active:to-[#FD9F26] text-white rounded-xl transition-all duration-300 shadow-md"
                  style={{ fontFamily: body, fontWeight: 600, fontSize: "0.9rem" }}
                >
                  Ga naar aanvraagformulier
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Pricing Modal with Tabs ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" onClick={() => setModalOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" style={{ animation: "pricingFadeIn 300ms ease-out" }} />
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
                <p className="text-gray-400 text-sm" style={{ fontFamily: body }}>Verkeersschool Beckers — overzicht van al onze prijzen</p>
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
        @keyframes pricingPop { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes confirmSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes confirmProgress { from { width: 100%; } to { width: 0%; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
