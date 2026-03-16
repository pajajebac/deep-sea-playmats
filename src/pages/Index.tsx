import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProductGrid />
      <ComingSoonSection />
      <Footer />
    </div>
  );
};

export default Index;
