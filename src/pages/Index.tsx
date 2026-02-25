import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="produtos" className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Nossas Camisas
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Cada peça é pensada com cuidado para unir estilo, conforto e durabilidade.
            </p>
          </div>
          <ProductGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
