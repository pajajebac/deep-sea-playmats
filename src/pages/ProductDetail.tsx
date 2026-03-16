import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShoppingCart, Swords } from "lucide-react";
import { toast } from "sonner";

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

      <div className="pt-16">
        {isLoading && (
          <div className="flex justify-center py-32">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {product && (
          <>
            {/* Full-bleed hero image area */}
            <div className="relative">
              <div className="container mx-auto px-4 pt-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm mb-6"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to the Grand Collection
                </Link>
              </div>

              <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start">
                  {/* Image Gallery - dramatic presentation */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative group">
                      <div className="aspect-square overflow-hidden bg-secondary wanted-border">
                        {images[selectedImage] && (
                          <img
                            src={images[selectedImage].node.url}
                            alt={images[selectedImage].node.altText || product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                      </div>
                      {/* Corner decorations */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary" />
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
                                : "border-border hover:border-primary/40 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Product Info - wanted poster style */}
                  <motion.div
                    className="space-y-6 lg:sticky lg:top-24 py-8 lg:py-0"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* WANTED tag */}
                    <div className="inline-block">
                      <span className="bg-accent text-accent-foreground font-display text-[10px] tracking-[0.3em] uppercase px-4 py-1.5">
                        WANTED
                      </span>
                    </div>

                    <h1 className="font-pirate text-4xl md:text-5xl lg:text-6xl text-gold-gradient leading-tight">
                      {product.title}
                    </h1>

                    {variant && (
                      <div className="flex items-baseline gap-3">
                        <span className="font-pirate text-4xl text-primary drop-shadow-[0_0_10px_hsla(40,90%,50%,0.3)]">
                          {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground font-body text-sm">bounty price</span>
                      </div>
                    )}

                    <div className="w-full h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

                    {/* Variant selection */}
                    {product.options
                      ?.filter((o: { name: string }) => o.name !== "Title")
                      .map((option: { name: string; values: string[] }) => (
                        <div key={option.name} className="space-y-3">
                          <label className="font-display text-xs font-bold tracking-[0.2em] uppercase text-foreground/70">
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
                                      : "border-border text-foreground/70 hover:border-primary/40 hover:text-foreground"
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
                        className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-display text-sm tracking-[0.2em] uppercase border border-gold-dark treasure-glow"
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
                      <p className="text-accent text-sm font-display tracking-wide">
                        ☠ This treasure has been claimed — currently sold out.
                      </p>
                    )}

                    <div className="border-t border-border pt-6 mt-8">
                      <h2 className="font-display text-xs font-bold tracking-[0.2em] uppercase text-foreground/70 mb-3">
                        Captain's Log
                      </h2>
                      <p className="font-body text-foreground/70 leading-relaxed text-lg">
                        {product.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
