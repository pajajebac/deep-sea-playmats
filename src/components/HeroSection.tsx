import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-end pb-16">
      <img
        src={heroBg}
        alt="Pirate ship on stormy seas"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-gold-gradient tracking-wider leading-tight mb-4">
          PLAYMAT PIRATE
        </h1>
        <p className="font-body text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
          Premium playmats for One Piece Card Game players. Set sail with designs 
          forged from the Grand Line itself.
        </p>
      </div>
    </section>
  );
};
