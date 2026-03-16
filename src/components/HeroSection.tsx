import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import strawHatJollyRoger from "@/assets/straw-hat-jolly-roger.png";
import luffyTreasure from "@/assets/luffy-treasure.png";
import strawHat from "@/assets/straw-hat.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="Pirate ship sailing the Grand Line"
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Animated particle overlay */}
      <div className="absolute inset-0 particles-bg opacity-40" />

      {/* Faint rotating jolly roger watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={strawHatJollyRoger}
          alt=""
          className="w-[600px] h-[600px] opacity-[0.04] animate-slow-spin"
        />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 wave-divider z-10" />

      {/* Glowing orb behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 animate-pulse-glow pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left - Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Straw hat floating above title */}
            <motion.img
              src={strawHat}
              alt="Straw Hat"
              className="w-28 md:w-36 mx-auto lg:mx-0 mb-4 drop-shadow-[0_10px_30px_hsla(40,90%,50%,0.3)]"
              initial={{ y: -60, opacity: 0, rotate: -15 }}
              animate={{ y: 0, opacity: 1, rotate: -5 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              style={{ animation: "sway 6s ease-in-out infinite" }}
            />

            <motion.h1
              className="font-pirate text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-gold-gradient tracking-wider leading-none mb-4 drop-shadow-[0_4px_20px_hsla(40,90%,50%,0.2)]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              PLAYMAT
              <br />
              PIRATE
            </motion.h1>

            <motion.div
              className="w-40 h-[2px] bg-gradient-to-r from-primary via-gold-light to-transparent mx-auto lg:mx-0 my-5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            <motion.p
              className="font-body text-lg md:text-xl text-foreground/70 max-w-lg mx-auto lg:mx-0 leading-relaxed italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              "The Grand Line's finest playmats. Every piece is a treasure
              worth fighting for — claim yours before the World Government does."
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.a
                href="#collection"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground font-display font-bold text-sm tracking-[0.2em] uppercase treasure-glow-intense hover:brightness-110 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ⚓ Claim Your Treasure
              </motion.a>
              <motion.a
                href="#coming-soon"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-primary/30 text-primary font-display text-sm tracking-[0.15em] uppercase hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                ✦ Coming Soon
              </motion.a>
            </motion.div>
          </div>

          {/* Right - Luffy with treasure */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          >
            <div className="relative">
              {/* Glow behind Luffy */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] scale-75" />
              <img
                src={luffyTreasure}
                alt="Pirate King with treasure"
                className="relative w-64 md:w-80 lg:w-96 drop-shadow-[0_10px_40px_hsla(0,0%,0%,0.5)] animate-float"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 border-2 border-primary/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-primary/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
