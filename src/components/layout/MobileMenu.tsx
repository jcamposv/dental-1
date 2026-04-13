import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navigation: readonly NavItem[];
  logoSrc: string;
}

export default function MobileMenu({ navigation, logoSrc }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger / Close Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[60] flex h-10 w-10 items-center justify-center"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-6 bg-neutral-800 transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-neutral-800 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-neutral-800 transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* Fullscreen Mobile Menu */}
      <div
        style={{ backgroundColor: "#ffffff" }}
        className={`fixed inset-0 z-[55] flex flex-col transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Logo top-left */}
        <div className="absolute top-3 left-5 z-[60]">
          <a href="#home" onClick={() => setIsOpen(false)}>
            <img src={logoSrc} alt="Otto Dental" className="h-10 w-auto" />
          </a>
        </div>

        <nav
          style={{ backgroundColor: "#ffffff" }}
          className="flex flex-1 flex-col items-center justify-center gap-3 px-8 pt-24 pb-12"
          aria-label="Navegación móvil"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="w-full max-w-xs rounded-xl px-4 py-3 text-center text-xl font-medium text-neutral-800 transition-colors hover:bg-[#DDF5F1] hover:text-[#0C6B63]"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent("open-booking"));
            }}
            className="mt-4 w-full max-w-xs rounded-full bg-[#E8B86D] px-6 py-3.5 text-center text-lg font-semibold text-neutral-900 transition-all hover:bg-[#D4A35A]"
          >
            Agendar Cita
          </button>
        </nav>
      </div>
    </>
  );
}
