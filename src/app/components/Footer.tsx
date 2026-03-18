import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "../../assets/866a497a9b00e621a1fd3a06b52178b660fb5a92.png";
import { ScrollReveal } from "./ScrollReveal";

const heading = "'zeitung', 'Inter', sans-serif";
const body = "'zeitung', 'Inter', sans-serif";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Opleidingen", href: "#rijlessen" },
  { label: "Tarieven", href: "#tarieven" },
  { label: "Over Ons", href: "#over-ons" },
  { label: "Locaties", href: "#locaties" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#proefles" },
];

const legalLinks = [
  { label: "Privacybeleid", href: "#" },
  { label: "Algemene voorwaarden", href: "#" },
  { label: "Cookiebeleid", href: "#" },
];

export function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-[#0A0A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo & description */}
            <div className="sm:col-span-2 lg:col-span-1">
              <img src={logo} alt="Verkeersschool Beckers" className="h-11 w-auto mb-5 brightness-0 invert" />
              <p className="text-gray-500 text-sm leading-relaxed mb-6" style={{ fontFamily: body, fontWeight: 400 }}>
                Verkeersschool Beckers — een familiebedrijf sinds 2007. Jouw partner voor betrouwbare en persoonlijke rijlessen in de Bommelerwaard.
              </p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 bg-white/5 hover:bg-[#1956E3] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.path} /></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="mb-5" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.95rem" }}>Snelle links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-gray-500 hover:text-[#FD9F26] transition-colors duration-300 text-sm group inline-flex items-center gap-1.5"
                      style={{ fontFamily: body, fontWeight: 400 }}
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-[#FD9F26] transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="mb-5" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.95rem" }}>Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#FD9F26] flex-shrink-0" />
                  <span style={{ fontFamily: body }}>Zaltbommel en omgeving<br />Bommelerwaard</span>
                </li>
                <li className="flex items-start gap-3 text-gray-500 text-sm">
                  <Phone className="w-4 h-4 mt-0.5 text-[#FD9F26] flex-shrink-0" />
                  <div style={{ fontFamily: body }}>
                    <a href="tel:+31638687155" className="hover:text-white transition-colors duration-300 block">Mitchell: 06 - 38 68 71 55</a>
                    <a href="tel:+31634042048" className="hover:text-white transition-colors duration-300 block mt-1">Rodney: 06 - 34 04 20 48</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-sm">
                  <Mail className="w-4 h-4 text-[#FD9F26] flex-shrink-0" />
                  <a href="mailto:info@beckers-rijschool.nl" className="hover:text-white transition-colors duration-300" style={{ fontFamily: body }}>info@beckers-rijschool.nl</a>
                </li>
              </ul>
            </div>

            {/* Opening hours */}
            <div>
              <h4 className="mb-5" style={{ fontFamily: heading, fontWeight: 700, fontSize: "0.95rem" }}>Openingstijden</h4>
              <ul className="space-y-3.5 text-sm">
                {[
                  { days: "Maandag - Vrijdag", hours: "08:00 - 20:00" },
                  { days: "Zaterdag", hours: "09:00 - 17:00" },
                  { days: "Zondag", hours: "Gesloten" },
                ].map((schedule) => (
                  <li key={schedule.days} className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 text-[#FD9F26] flex-shrink-0" />
                    <div style={{ fontFamily: body }}>
                      <p className="text-gray-500">{schedule.days}</p>
                      <p className="text-white" style={{ fontWeight: 500 }}>{schedule.hours}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs" style={{ fontFamily: body }}>
              &copy; 2026 Verkeersschool Beckers. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-600 hover:text-gray-400 transition-colors duration-300 text-xs" style={{ fontFamily: body }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
