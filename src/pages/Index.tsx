import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    // Container principal com altura mínima de tela e flex column
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header fixo no topo */}
      <Header />
      
      {/* Main content com flex-1 para ocupar espaço disponível */}
      <main className="flex-1">
        {/* Hero banner */}
        <Hero />
        
        {/* Seção de produtos com padding responsivo */}
        <section 
          id="produtos" 
          className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24"
        >
          {/* Título da seção com tipografia responsiva */}
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              Nossas Camisas
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Cada peça é pensada com cuidado para unir estilo e conforto
            </p>
          </div>
          
          {/* Grid de produtos (já responsivo) */}
          <ProductGrid />
        </section>
      </main>
      
      {/* Footer no final */}
      <Footer />
    </div>
  );
};

export default Index;