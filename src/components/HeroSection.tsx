import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import jollyRoger from "@/assets/jolly-roger.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Pirate ship sailing the Grand Line"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Animated wave overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 wave-divider" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.img
          src={jollyRoger}
          alt="Playmat Pirate Jolly Roger"
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 animate-float drop-shadow-[0_0_30px_hsla(40,90%,50%,0.4)]"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        />

        <motion.h1
          className="font-pirate text-5xl md:text-7xl lg:text-8xl text-gold-gradient tracking-wider leading-tight mb-2 drop-shadow-[0_2px_10px_hsla(40,90%,50%,0.3)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          PLAYMAT PIRATE
        </motion.h1>

        <motion.div
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto my-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <motion.p
          className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          "Set sail on the Grand Line. Claim your treasure.
          <br />
          Premium playmats forged for true pirates."
        </motion.p>

        <motion.a
          href="#collection"
          className="inline-block mt-8 px-8 py-3 border-2 border-primary bg-primary/10 text-primary font-display font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 treasure-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          ⚓ Explore the Collection
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-primary/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
