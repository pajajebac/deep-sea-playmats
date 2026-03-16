import jollyRoger from "@/assets/jolly-roger.png";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-background py-16 overflow-hidden">
      {/* Faint jolly roger watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <img src={jollyRoger} alt="" className="w-64 h-64" />
      </div>

      <div className="container mx-auto px-4 text-center space-y-4 relative z-10">
        <div className="flex items-center justify-center gap-3">
          <img src={jollyRoger} alt="" className="h-8 w-8" />
          <span className="font-pirate text-lg text-primary tracking-wider">
            PLAYMAT PIRATE
          </span>
        </div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto" />
        <p className="text-xs text-muted-foreground font-body tracking-wide">
          © {new Date().getFullYear()} Playmat Pirate. The treasure is real.
        </p>
      </div>
    </footer>
  );
};
