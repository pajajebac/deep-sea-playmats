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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/product/${node.handle}`}
        className="group block relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 wanted-border"
      >
        {/* "WANTED" ribbon */}
        <div className="absolute top-3 left-0 z-10 bg-accent text-accent-foreground font-display text-[10px] tracking-[0.2em] uppercase px-3 py-1 shadow-lg">
          WANTED
        </div>

        <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">
              No image
            </div>
          )}
          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-4 space-y-3 relative">
          <h3 className="font-display text-sm font-bold tracking-wider text-foreground line-clamp-2 uppercase">
            {node.title}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-pirate text-2xl text-primary drop-shadow-[0_0_6px_hsla(40,90%,50%,0.3)]">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </span>
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="bg-primary text-primary-foreground hover:bg-primary/90 border border-gold-dark"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
