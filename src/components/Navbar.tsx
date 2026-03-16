import { Anchor } from "lucide-react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Anchor className="h-6 w-6 text-primary" />
          <span className="font-display text-lg font-bold text-primary tracking-wider">
            PLAYMAT PIRATE
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display text-sm tracking-wide text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
