import strawHatJollyRoger from "@/assets/straw-hat-jolly-roger.png";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-background py-16 overflow-hidden">
      {/* Large faint watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <img src={strawHatJollyRoger} alt="" className="w-80 h-80" />
      </div>

      <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
        <div className="flex items-center justify-center gap-3">
          <img src={strawHatJollyRoger} alt="" className="h-10 w-10 drop-shadow-[0_0_8px_hsla(40,90%,50%,0.2)]" />
          <span className="font-pirate text-xl text-primary tracking-wider">
            PLAYMAT PIRATE
          </span>
        </div>

        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto" />

        <p className="font-body text-sm text-muted-foreground italic">
          "The treasure is real. The adventure never ends."
        </p>

        <div className="flex justify-center gap-6">
          <a href="#collection" className="font-display text-[9px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors">
            Collection
          </a>
          <a href="#coming-soon" className="font-display text-[9px] tracking-[0.2em] uppercase text-muted-foreground hover:text-mystic-glow transition-colors">
            Coming Soon
          </a>
        </div>

        <p className="text-[10px] text-muted-foreground/50 font-body tracking-wide">
          © {new Date().getFullYear()} Playmat Pirate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
