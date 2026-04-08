import { useState, useEffect } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Opleidingen", href: "#rijlessen" },
  { label: "Tarieven", href: "#tarieven" },
  { label: "Over Ons", href: "#over-ons" },
  { label: "Lesgebied", href: "#locaties" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a href="#home" onClick={(e) => handleClick(e, "#home")} className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <BrandLogo priority className="h-10 w-auto sm:h-12" />
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-gray-600 hover:text-[#1956E3] transition-colors duration-300 py-1 group"
                style={{ fontFamily: "'zeitung', 'Inter', sans-serif", fontWeight: 500, fontSize: "0.9rem" }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FD9F26] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#proefles"
              onClick={(e) => handleClick(e, "#proefles")}
              className="inline-flex items-center px-6 py-2.5 bg-[#FD9F26] hover:brightness-90 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              style={{ fontFamily: "'zeitung', 'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Proefles aanvragen
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://wa.me/31638687155"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            <button
              className="p-2 text-gray-700 hover:text-[#1956E3] transition-colors duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
                <X
                  size={24}
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? "rotate(0deg)" : "rotate(-90deg)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: mobileOpen ? "500px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-5 space-y-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2.5 px-3 text-gray-700 hover:text-[#1956E3] hover:bg-[#1956E3]/5 rounded-lg transition-all duration-300"
              style={{
                fontFamily: "'zeitung', 'Inter', sans-serif",
                fontWeight: 500,
                transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-10px)",
              }}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#proefles"
              className="block text-center px-6 py-3.5 bg-[#FD9F26] hover:brightness-90 text-white rounded-full transition-all duration-300"
              style={{ fontFamily: "'zeitung', 'Inter', sans-serif", fontWeight: 600 }}
              onClick={(e) => handleClick(e, "#proefles")}
            >
              Proefles aanvragen
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
