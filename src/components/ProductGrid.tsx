import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(20),
  });

  return (
    <section id="collection" className="relative bg-ocean-gradient py-24">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-24 wave-divider rotate-180" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-pirate text-4xl md:text-5xl text-gold-gradient tracking-wider mb-3">
            The Grand Collection
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4" />
          <p className="font-body text-muted-foreground text-lg italic">
            Every piece, a treasure worth fighting for
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <p className="text-center text-accent py-10 font-display tracking-wide">
            The sea is rough — failed to load treasures. Try again later.
          </p>
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
    </section>
  );
};
