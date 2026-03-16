import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import jollyRoger from "@/assets/jolly-roger.png";

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
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_hsla(40,90%,50%,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={jollyRoger} alt="" className="h-8 w-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-pirate text-xl text-primary tracking-wider drop-shadow-[0_0_8px_hsla(40,90%,50%,0.3)]">
            PLAYMAT PIRATE
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-display text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-primary transition-colors"
          >
            Collection
          </Link>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
