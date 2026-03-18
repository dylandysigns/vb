import { useEffect, useRef } from "react";
import { Phone, MessageCircle, Package, X } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { usePackage } from "./PackageContext";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

export function FinalCTA() {
  const { selectedPackage, setSelectedPackage } = usePackage();
  const packageRef = useRef<HTMLDivElement>(null);

  // Flash the package badge when it changes
  useEffect(() => {
    if (selectedPackage && packageRef.current) {
      packageRef.current.classList.remove("cta-flash");
      void packageRef.current.offsetWidth; // force reflow
      packageRef.current.classList.add("cta-flash");
    }
  }, [selectedPackage]);

  return (
    <section
      id="proefles"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #1956E3 0%, #1956E3 40%, #1956E3 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <h2
            className="text-3xl sm:text-4xl lg:text-[3rem] text-white mb-6 tracking-tight"
            style={{ fontFamily: heading, fontWeight: 800, lineHeight: 1.15 }}
          >
            Klaar om te beginnen met{" "}
            <span className="relative inline-block">
              <span className="text-[#FD9F26]">rijlessen</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FD9F26]/30 rounded-full" />
            </span>
            ?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
            Plan vandaag nog een proefles en ontdek hoe fijn het is om te leren rijden bij Verkeersschool Beckers.
          </p>
        </ScrollReveal>

        {/* Lead form */}
        <ScrollReveal delay={200}>
          <div className="bg-white/8 backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-xl mx-auto mb-12 border border-white/10">
            <h3 className="text-white mb-3" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.3rem" }}>
              Vraag je proefles aan
            </h3>

            {/* Selected package badge */}
            {selectedPackage && (
              <div
                ref={packageRef}
                className="inline-flex items-center gap-2.5 bg-[#FD9F26]/15 border border-[#FD9F26]/30 text-[#FD9F26] px-4 py-2 rounded-xl mb-6"
                style={{ animation: "ctaBadgeIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm" style={{ fontFamily: body, fontWeight: 600 }}>
                  {selectedPackage}
                </span>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="p-0.5 hover:bg-[#FD9F26]/20 rounded-md transition-colors duration-200 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {!selectedPackage && (
              <p className="text-white/40 text-sm mb-6" style={{ fontFamily: body }}>
                Selecteer hierboven een pakket, of vul direct het formulier in
              </p>
            )}

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Voornaam"
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
                <input
                  type="text"
                  placeholder="Achternaam"
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="E-mailadres"
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                  style={{ fontFamily: body }}
                />
              </div>
              <input
                type="text"
                placeholder="Woonplaats"
                className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300"
                style={{ fontFamily: body }}
              />

              {/* Hidden field for selected package */}
              {selectedPackage && (
                <input type="hidden" name="selected_package" value={selectedPackage} />
              )}

              {/* Visible package selection in form */}
              <div className="relative">
                <select
                  value={selectedPackage || ""}
                  onChange={(e) => setSelectedPackage(e.target.value || null)}
                  className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300 appearance-none cursor-pointer"
                  style={{ fontFamily: body }}
                >
                  <option value="" className="text-gray-900">Kies een pakket (optioneel)</option>
                  <option value="30 Uur Pakket (€ 2.580,-)" className="text-gray-900">30 Uur Pakket — € 2.580,-</option>
                  <option value="35 Uur Pakket (€ 2.925,-)" className="text-gray-900">35 Uur Pakket — € 2.925,-</option>
                  <option value="40 Uur Pakket (€ 3.270,-)" className="text-gray-900">40 Uur Pakket — € 3.270,-</option>
                  <option value="Proefles + Advies (€ 60,-)" className="text-gray-900">Proefles + Advies — € 60,-</option>
                  <option value="Losse Rijles 60 min. (€ 70,-)" className="text-gray-900">Losse Rijles 60 min. — € 70,-</option>
                  <option value="Losse Rijles 90 min. (€ 105,-)" className="text-gray-900">Losse Rijles 90 min. — € 105,-</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Text area for message */}
              <textarea
                placeholder="Heb je een vraag of opmerking? Laat het hier weten (optioneel)"
                rows={3}
                className="w-full px-5 py-3.5 bg-white/8 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FD9F26] focus:bg-white/12 transition-all duration-300 resize-none"
                style={{ fontFamily: body }}
              />

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#FD9F26] to-[#FD9F26] hover:from-[#FD9F26] hover:to-[#FD9F26] text-white rounded-xl transition-all duration-300 shadow-lg shadow-[#FD9F26]/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: body, fontWeight: 700 }}
              >
                {selectedPackage ? "Aanvraag versturen" : "Proefles aanvragen"}
              </button>
            </form>
            <p className="text-white/30 text-xs mt-4" style={{ fontFamily: body }}>
              * De proefles kost € 60,- inclusief persoonlijk advies
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={350}>
            <p className="text-white/50 mb-5 text-sm" style={{ fontFamily: body, fontWeight: 500 }}>Of neem direct contact met ons op</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+31638687155"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/8 hover:bg-white/15 text-white rounded-full transition-all duration-300 border border-white/15 hover:border-white/25 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              <Phone className="w-4 h-4" />
              Mitchell: 06 - 38 68 71 55
            </a>
            <a
              href="tel:+31634042048"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/8 hover:bg-white/15 text-white rounded-full transition-all duration-300 border border-white/15 hover:border-white/25 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              <Phone className="w-4 h-4" />
              Rodney: 06 - 34 04 20 48
            </a>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href="https://wa.me/31638687155"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5"
              style={{ fontFamily: body, fontWeight: 500 }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp ons
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes ctaBadgeIn {
          from { opacity: 0; transform: scale(0.8) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cta-flash {
          animation: ctaBadgeIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
}
