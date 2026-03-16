import { motion } from "framer-motion";
import yugiohBg from "@/assets/yugioh-teaser-bg.jpg";

export const ComingSoonSection = () => {
  return (
    <section id="coming-soon" className="relative py-32 overflow-hidden">
      {/* Background */}
      <img
        src={yugiohBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />

      {/* Mystic glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-mystic/10 blur-[80px] animate-pulse-glow pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          >
            <span className="px-5 py-2 border border-mystic-glow/40 bg-mystic/10 text-mystic-glow font-display text-[10px] tracking-[0.4em] uppercase animate-mystic-pulse">
              ✦ A New Realm Approaches ✦
            </span>
          </motion.div>

          <motion.h2
            className="font-pirate text-4xl md:text-6xl lg:text-7xl text-mystic-gradient mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Yu-Gi-Oh! Playmats
          </motion.h2>

          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-mystic-glow to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          <motion.p
            className="font-body text-xl md:text-2xl text-foreground/60 italic mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            "It's time to d-d-d-duel!"
          </motion.p>

          <motion.p
            className="font-body text-base text-muted-foreground max-w-xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Premium dueling mats forged in the Shadow Realm. Ancient designs.
            Legendary quality. The heart of the cards awaits your command.
          </motion.p>

          {/* Mystical countdown / hype elements */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {[
              { label: "Designs", value: "???" },
              { label: "Power Level", value: "∞" },
              { label: "Status", value: "SEALED" },
            ].map((item) => (
              <div key={item.label} className="border border-mystic/30 bg-mystic/5 p-4">
                <div className="font-pirate text-2xl text-mystic-glow mb-1">{item.value}</div>
                <div className="font-display text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="inline-block px-8 py-3 border border-mystic-glow/20 bg-mystic/5 text-mystic-glow font-display text-xs tracking-[0.2em] uppercase cursor-default">
              🔮 Arriving Soon — Stay Vigilant
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
