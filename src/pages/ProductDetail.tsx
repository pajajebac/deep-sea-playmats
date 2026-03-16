import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
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
    const shopifyProduct = {
      node: product,
    };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: product.title,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body">
          <ArrowLeft className="h-4 w-4" /> Back to collection
        </Link>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {product && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                {images[selectedImage] && (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        idx === selectedImage ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {product.title}
              </h1>
              {variant && (
                <p className="font-display text-2xl font-bold text-primary">
                  {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                </p>
              )}

              {/* Variant selection */}
              {product.options?.filter((o: { name: string }) => o.name !== "Title").map((option: { name: string; values: string[] }) => (
                <div key={option.name} className="space-y-2">
                  <label className="font-display text-sm font-semibold tracking-wide">{option.name}</label>
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
                          className={`px-4 py-2 rounded-md border text-sm font-body transition-colors ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Button
                onClick={handleAddToCart}
                disabled={isCartLoading || !variant?.availableForSale}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                {isCartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              {variant && !variant.availableForSale && (
                <p className="text-destructive text-sm font-body">This variant is currently sold out.</p>
              )}

              <div className="border-t border-border pt-6">
                <h2 className="font-display text-lg font-semibold mb-2">Description</h2>
                <p className="font-body text-foreground/80 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
