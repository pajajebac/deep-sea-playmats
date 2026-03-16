import { Anchor } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container mx-auto px-4 text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Anchor className="h-5 w-5 text-primary" />
          <span className="font-display text-sm font-bold text-primary tracking-wider">PLAYMAT PIRATE</span>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} Playmat Pirate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
