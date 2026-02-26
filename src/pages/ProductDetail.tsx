import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductByHandle } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/whatsapp";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const product = handle ? getProductByHandle(handle) : null;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Produto não encontrado
            </h1>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para loja
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const variant = product.variants[selectedVariantIdx];
    addItem({
      id: `${product.id}-${variant.id}`,
      productId: product.id,
      title: product.title,
      variant: variant.title,
      price: variant.price,
      quantity,
      image: product.image
    });
    toast.success(`${quantity}x ${product.title} adicionado ao carrinho!`);
  };

  const selectedVariant = product.variants[selectedVariantIdx];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Container responsivo com padding fluido */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
          
          {/* Botão voltar - responsivo */}
          <Link to="/" className="inline-block mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              className="gap-2 text-sm sm:text-base hover:gap-3 transition-all"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Voltar para loja</span>
              <span className="xs:hidden">Voltar</span>
            </Button>
          </Link>

          {/* Grid responsivo: 1 coluna (mobile)  2 colunas (lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            
            {/* Coluna da imagem */}
            <div className="w-full">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 sticky top-20 sm:top-24">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Coluna das informações */}
            <div className="flex flex-col gap-6 sm:gap-8">
              
              {/* Título e preço */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
                  {product.title}
                </h1>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                  {formatCurrency(selectedVariant.price)}
                </p>
              </div>

              {/* Descrição */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">
                  Descrição
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Seleção de tamanho */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
                  Tamanho
                </h2>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`
                        py-3 sm:py-4 px-4 sm:px-6 rounded-lg border-2 
                        text-sm sm:text-base md:text-lg font-semibold
                        transition-all duration-200
                        ${selectedVariantIdx === idx
                          ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                          : 'border-border hover:border-primary/50 hover:scale-102'
                        }
                      `}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controle de quantidade */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
                  Quantidade
                </h2>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold min-w-[3rem] sm:min-w-[4rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 sm:h-12 sm:w-12"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>

              {/* Botão adicionar ao carrinho */}
              <Button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                size="lg"
                className="w-full gap-2 sm:gap-3 text-base sm:text-lg md:text-xl py-6 sm:py-7 md:py-8 mt-2 sm:mt-4"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;