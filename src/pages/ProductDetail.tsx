import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Swords } from "lucide-react";
import { toast } from "sonner";
import strawHatJollyRoger from "@/assets/straw-hat-jolly-roger.png";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const isCartLoading = useCartStore((state) => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
  });

  const variant = product?.variants?.edges?.[selectedVariantIdx]?.node;
  const images = product?.images?.edges || [];

  const handleAddToCart = async () => {
    if (!variant || !product) return;
    const shopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Treasure claimed!", {
      description: product.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16 relative">
        {/* Background watermark */}
        <div className="absolute top-32 right-0 opacity-[0.02] pointer-events-none">
          <img src={strawHatJollyRoger} alt="" className="w-[400px] h-[400px]" />
        </div>

        {/* Particle overlay */}
        <div className="absolute inset-0 particles-bg opacity-10 pointer-events-none" />

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="font-body text-muted-foreground italic">Retrieving treasure...</p>
          </div>
        )}

        {product && (
          <div className="container mx-auto px-4 pt-6 pb-20 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to the Grand Collection
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
              {/* Image Gallery */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative group">
                  {/* Main image */}
                  <div className="aspect-square overflow-hidden bg-secondary wanted-border relative">
                    {images[selectedImage] && (
                      <img
                        src={images[selectedImage].node.url}
                        alt={images[selectedImage].node.altText || product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    {/* Vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_hsla(0,0%,0%,0.3)] pointer-events-none" />
                  </div>
                  {/* Decorative corners */}
                  <div className="absolute -top-1.5 -left-1.5 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
                  <div className="absolute -top-1.5 -right-1.5 w-8 h-8 border-t-2 border-r-2 border-primary/60" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-2 border-l-2 border-primary/60" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
                </div>

                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${
                          idx === selectedImage
                            ? "border-primary treasure-glow"
                            : "border-border opacity-50 hover:opacity-80 hover:border-primary/30"
                        }`}
                      >
                        <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                className="space-y-6 lg:sticky lg:top-24 py-4 lg:py-0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* WANTED poster header */}
                <div className="border border-accent/30 bg-accent/5 p-5 relative">
                  <div className="absolute -top-3 left-4">
                    <span className="bg-accent text-accent-foreground font-display text-[10px] tracking-[0.3em] uppercase px-4 py-1.5">
                      WANTED — DEAD OR ALIVE
                    </span>
                  </div>
                  <h1 className="font-pirate text-3xl md:text-4xl lg:text-5xl text-gold-gradient leading-tight mt-3">
                    {product.title}
                  </h1>
                </div>

                {variant && (
                  <div className="flex items-baseline gap-4">
                    <span className="font-pirate text-4xl md:text-5xl text-primary drop-shadow-[0_0_15px_hsla(40,90%,50%,0.2)]">
                      {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                    </span>
                    <span className="text-muted-foreground font-display text-[10px] tracking-[0.2em] uppercase">
                      bounty price
                    </span>
                  </div>
                )}

                <div className="w-full h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

                {/* Variant selection */}
                {product.options
                  ?.filter((o: { name: string }) => o.name !== "Title")
                  .map((option: { name: string; values: string[] }) => (
                    <div key={option.name} className="space-y-3">
                      <label className="font-display text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/60">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variantIdx = product.variants.edges.findIndex(
                            (v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                              v.node.selectedOptions.some(
                                (so) => so.name === option.name && so.value === value
                              )
                          );
                          const isSelected = variantIdx === selectedVariantIdx;
                          return (
                            <button
                              key={value}
                              onClick={() => variantIdx >= 0 && setSelectedVariantIdx(variantIdx)}
                              className={`px-5 py-2.5 border text-sm font-display tracking-wider transition-all duration-300 ${
                                isSelected
                                  ? "border-primary bg-primary/15 text-primary treasure-glow"
                                  : "border-border text-foreground/60 hover:border-primary/40 hover:text-foreground"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleAddToCart}
                    disabled={isCartLoading || !variant?.availableForSale}
                    className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-display text-sm tracking-[0.2em] uppercase treasure-glow-intense"
                    size="lg"
                  >
                    {isCartLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Swords className="h-5 w-5 mr-3" />
                        Claim This Treasure
                      </>
                    )}
                  </Button>
                </motion.div>

                {variant && !variant.availableForSale && (
                  <div className="border border-accent/30 bg-accent/5 p-3 text-center">
                    <p className="text-accent text-sm font-display tracking-wide">
                      ☠ This treasure has been claimed — currently sold out
                    </p>
                  </div>
                )}

                <div className="border-t border-border pt-6 mt-4">
                  <h2 className="font-display text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/60 mb-4">
                    Captain's Log
                  </h2>
                  <p className="font-body text-foreground/60 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  {[
                    { icon: "⚓", text: "Grand Line Quality" },
                    { icon: "🏴‍☠️", text: "Fast Shipping" },
                    { icon: "💎", text: "Premium Materials" },
                  ].map((badge) => (
                    <div key={badge.text} className="text-center p-3 border border-border bg-secondary/30">
                      <div className="text-xl mb-1">{badge.icon}</div>
                      <div className="font-display text-[8px] tracking-[0.15em] uppercase text-muted-foreground">
                        {badge.text}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
