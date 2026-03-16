import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Treasure claimed!", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
    >
      <Link
        to={`/product/${node.handle}`}
        className="group block relative overflow-hidden bg-card wanted-border transition-all duration-500"
      >
        {/* WANTED ribbon */}
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-accent text-accent-foreground font-display text-[9px] tracking-[0.25em] uppercase px-3 py-1 shadow-lg">
            WANTED
          </div>
        </div>

        {/* Bounty corner */}
        <div className="absolute top-0 right-0 z-10 bg-background/80 backdrop-blur-sm px-2 py-1">
          <span className="font-pirate text-sm text-primary">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </span>
        </div>

        <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">
              No image
            </div>
          )}
          {/* Hover overlay with glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Add to cart button that appears on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="bg-primary text-primary-foreground hover:bg-primary/90 treasure-glow"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  <span className="text-xs tracking-wider">CLAIM</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="p-4 relative">
          {/* Gold line accent */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <h3 className="font-display text-xs font-bold tracking-[0.15em] text-foreground line-clamp-2 uppercase mt-1 group-hover:text-primary transition-colors duration-300">
            {node.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};
