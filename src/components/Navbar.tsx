import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import strawHatJollyRoger from "@/assets/straw-hat-jolly-roger.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-[0_4px_30px_hsla(0,0%,0%,0.3)]"
          : "bg-gradient-to-b from-background/60 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={strawHatJollyRoger}
            alt=""
            className="h-9 w-9 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_8px_hsla(40,90%,50%,0.3)]"
          />
          <span className="font-pirate text-xl text-primary tracking-wider drop-shadow-[0_0_10px_hsla(40,90%,50%,0.2)]">
            PLAYMAT PIRATE
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#collection"
            className="hidden sm:block font-display text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-primary transition-colors"
          >
            Collection
          </a>
          <a
            href="#coming-soon"
            className="hidden sm:block font-display text-[10px] tracking-[0.2em] uppercase text-foreground/50 hover:text-mystic-glow transition-colors"
          >
            Coming Soon
          </a>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
