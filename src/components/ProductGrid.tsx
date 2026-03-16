import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(20),
  });

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-gold-gradient tracking-wider mb-8 text-center">
        ⚓ THE COLLECTION
      </h2>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <p className="text-center text-destructive py-10">
          Failed to load products. Please try again later.
        </p>
      )}

      {products && products.length === 0 && (
        <p className="text-center text-muted-foreground py-10 font-body text-lg">
          No products found. Check back soon for new loot!
        </p>
      )}

      {products && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
