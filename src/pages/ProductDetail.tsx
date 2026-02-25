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
  const product = handle ? getProductByHandle(handle) : undefined;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Produto não encontrado</h2>
            <Link to="/" className="text-primary hover:underline">Voltar à loja</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIdx];
  const price = product.price;

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
    });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 md:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Voltar à loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border/50">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/20" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {product.title}
            </h1>
            
            <span className="text-2xl md:text-3xl font-bold text-primary mb-6">
              {formatCurrency(price)}
            </span>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Tamanhos */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground mb-3 block">Tamanho</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      idx === selectedVariantIdx
                        ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                        : 'bg-card text-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-foreground mb-3 block">Quantidade</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to cart */}
            <Button
              size="lg"
              className="rounded-full h-14 text-base font-semibold shadow-lg shadow-primary/20 w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedVariant}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
