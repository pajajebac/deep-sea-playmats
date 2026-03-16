import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";
import strawHatJollyRoger from "@/assets/straw-hat-jolly-roger.png";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(20),
  });

  return (
    <section id="collection" className="relative bg-ocean-gradient py-28 overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-24 wave-divider rotate-180" />

      {/* Faint watermark */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.02] pointer-events-none">
        <img src={strawHatJollyRoger} alt="" className="w-[500px] h-[500px]" />
      </div>

      {/* Particle overlay */}
      <div className="absolute inset-0 particles-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-1.5 border border-primary/30 bg-primary/5 text-primary font-display text-[10px] tracking-[0.3em] uppercase mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            ☠ One Piece Card Game
          </motion.span>

          <h2 className="font-pirate text-4xl md:text-6xl text-gold-gradient tracking-wider mb-4">
            The Grand Collection
          </h2>
          <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-5" />
          <p className="font-body text-muted-foreground text-lg italic max-w-md mx-auto">
            Premium playmats from the Grand Line — each one a legendary treasure
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="font-body text-muted-foreground italic">Navigating the Grand Line...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-accent font-display tracking-wide mb-2">
              ☠ The sea is rough
            </p>
            <p className="text-muted-foreground font-body">Failed to load treasures. Try again later.</p>
          </div>
        )}

        {products && products.length === 0 && (
          <p className="text-center text-muted-foreground py-10 font-body text-lg italic">
            No treasures found. The Grand Line holds more secrets...
          </p>
        )}

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={product.node.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 wave-divider" />
    </section>
  );
};
