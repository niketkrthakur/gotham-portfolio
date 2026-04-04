import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import batSymbol from "@/assets/bat-symbol.png";
const audio = new Audio("/batman-click.mp3");

const playSound = () => {
  audio.currentTime = 0;
  audio.play();
};

const links = [
  { label: "Origin", href: "#origin" },
  { label: "Utility Belt", href: "#skills" },
  { label: "Missions", href: "#projects" },
  { label: "Classified", href: "#resume" },
  { label: "Signal", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 shadow-lg backdrop-blur-md border-b border-primary/30" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2 font-display text-xl tracking-widest text-foreground transition-colors hover:text-primary" style={{ cursor: "none" }}>
          <img
            src={batSymbol}
            alt=""
            className="h-6 w-auto transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_red]"
          />
          NKT
        </a>

        {/* Desktop */}
        <div className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                playSound();
                setActive(link.href);
              }}
              className={`relative font-mono text-xs tracking-[0.2em] transition-colors duration-300 ${
                active === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              } after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 ${
                active === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
              }`}
              style={{ cursor: "none" }}
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ cursor: "none" }}
          data-clickable
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="flex flex-col items-center gap-6 bg-background/95 py-8 backdrop-blur-md md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-sm tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              style={{ cursor: "none" }}
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
