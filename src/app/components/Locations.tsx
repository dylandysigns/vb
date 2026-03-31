import { useState, useMemo } from "react";
import { MapPin, Navigation, RotateCcw } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

interface Location {
  name: string;
  main: boolean;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  { name: "Zaltbommel", main: true, lat: 51.8115, lng: 5.2432 },
  { name: "Gameren", main: false, lat: 51.8064, lng: 5.2017 },
  { name: "Bruchem", main: false, lat: 51.7912, lng: 5.2230 },
  { name: "Zuilichem", main: false, lat: 51.7962, lng: 5.1201 },
  { name: "Nieuwaal", main: false, lat: 51.8130, lng: 5.1970 },
  { name: "Rossum", main: false, lat: 51.7996, lng: 5.3334 },
  { name: "Aalst", main: false, lat: 51.7880, lng: 5.1310 },
  { name: "Waardenburg", main: false, lat: 51.8310, lng: 5.2585 },
  { name: "Neerijnen", main: false, lat: 51.8370, lng: 5.2830 },
  { name: "Tuil", main: false, lat: 51.8220, lng: 5.2100 },
  { name: "Haaften", main: false, lat: 51.8245, lng: 5.2080 },
  { name: "Hellouw", main: false, lat: 51.8385, lng: 5.2460 },
];

const DEFAULT_ZOOM = 13;
const SELECTED_ZOOM = 15;

function buildGoogleMapUrl(lat: number, lng: number, zoom: number, placeName: string) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=m&output=embed&iwloc=near&hl=nl`;
}

export function Locations() {
  const [selectedLocation, setSelectedLocation] = useState<string>("Zaltbommel");

  const selected = useMemo(
    () => locations.find((l) => l.name === selectedLocation) || locations[0],
    [selectedLocation]
  );

  const zoom = selectedLocation === "Zaltbommel" ? DEFAULT_ZOOM : SELECTED_ZOOM;

  const mapUrl = useMemo(
    () => buildGoogleMapUrl(selected.lat, selected.lng, zoom, selected.name),
    [selected, zoom]
  );

  const handleLocationClick = (loc: Location) => {
    setSelectedLocation(loc.name);
  };

  const handleReset = () => {
    setSelectedLocation("Zaltbommel");
  };

  return (
    <section id="locaties" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[#1956E3] bg-[#1956E3]/8 px-5 py-2 rounded-full text-sm tracking-wide mb-5"
              style={{ fontFamily: body, fontWeight: 600 }}
            >
              Lesgebied
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] text-gray-900 mb-5 tracking-tight"
              style={{ fontFamily: heading, fontWeight: 800 }}
            >
              Waar geven wij les?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed" style={{ fontFamily: body, fontWeight: 400 }}>
              Verkeersschool Beckers is actief in Zaltbommel en omstreken.
              Klik op een locatie om deze op de kaart te bekijken. Onze praktijkexamens rijden wij in Tiel.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Map */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200/60 relative bg-gray-100" style={{ height: "500px" }}>
              <iframe
                key={`${selected.lat}-${selected.lng}-${zoom}`}
                src={mapUrl}
                title={`Kaart van ${selected.name}`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
              />

              {/* Premium inner shadow overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.05), inset 0 -60px 40px -40px rgba(249,250,251,0.35)",
                }}
              />

              {/* Selected location badge */}
              <div
                key={selected.name}
                className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/60"
                style={{ animation: "locBadgeIn 350ms cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ring-4 ${
                  selected.main ? "bg-[#FD9F26] ring-[#FD9F26]/20" : "bg-[#1956E3] ring-[#1956E3]/15"
                }`} />
                <div>
                  <p className="text-gray-900" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.2 }}>
                    {selected.name}
                  </p>
                  <p className="text-gray-400" style={{ fontFamily: body, fontSize: "0.7rem" }}>
                    {selected.main ? "Hoofdlocatie" : "Leslocatie"}
                  </p>
                </div>
              </div>

              {/* Reset button */}
              {selectedLocation !== "Zaltbommel" && (
                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-white/60 text-gray-500 hover:text-[#1956E3] transition-all duration-200 hover:shadow-xl"
                  title="Terug naar overzicht"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-xs hidden sm:inline" style={{ fontFamily: body, fontWeight: 500 }}>Overzicht</span>
                </button>
              )}

              {/* Region badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 bg-gradient-to-r from-[#1956E3] to-[#1956E3] px-4 py-2.5 rounded-xl shadow-lg">
                <Navigation className="w-3.5 h-3.5 text-[#FD9F26]" />
                <span className="text-white text-xs" style={{ fontFamily: body, fontWeight: 600 }}>
                  Tiel
                </span>
                <span className="text-white/40 text-[0.65rem]" style={{ fontFamily: body }}>
                  examengebied
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Location list */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1956E3] to-[#1956E3] rounded-xl flex items-center justify-center shadow-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 tracking-tight" style={{ fontFamily: heading, fontWeight: 700, fontSize: "1.1rem" }}>
                    Ons lesgebied
                  </h3>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: body }}>{locations.length} locaties in de regio</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {locations.map((loc) => {
                  const isSelected = selectedLocation === loc.name;
                  return (
                    <button
                      key={loc.name}
                      onClick={() => handleLocationClick(loc)}
                      className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl transition-all duration-300 text-left w-full ${
                        isSelected
                          ? "bg-gradient-to-r from-[#1956E3] to-[#1956E3] text-white shadow-lg ring-2 ring-[#FD9F26]/50 scale-[1.03]"
                          : "bg-gray-50 hover:bg-[#1956E3]/5 border border-gray-100 hover:border-[#1956E3]/20"
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-300 ${
                        isSelected ? "text-[#FD9F26]" : "text-[#1956E3]/40"
                      }`} />
                      <span
                        className={isSelected ? "text-white" : "text-gray-700"}
                        style={{ fontFamily: body, fontWeight: isSelected ? 600 : 400, fontSize: "0.85rem" }}
                      >
                        {loc.name}
                      </span>
                      {isSelected && (
                        <div className="ml-auto w-2 h-2 bg-[#FD9F26] rounded-full flex-shrink-0 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-gray-200">
                <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: body }}>
                  Wij halen je op en zetten je af bij een van deze locaties. Neem contact op voor de mogelijkheden in jouw buurt.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @keyframes locBadgeIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
