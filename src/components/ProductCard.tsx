import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/lib/whatsapp";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const firstVariant = product.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Produto sem variantes disponíveis");
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: firstVariant.price,
      image: product.image,
      size: firstVariant.size,
    });

    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <Link 
      to={`/produto/${product.handle}`}
      className="group block w-full"
    >
      <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
        {/* Container de imagem responsivo com aspect ratio fixo */}
        <div className="relative w-full aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Badge de categoria - responsivo */}
          {product.category && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium bg-primary text-primary-foreground rounded-full">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Conteúdo com padding fluido */}
        <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5">
          {/* Título com tipografia responsiva */}
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Descrição com line-clamp */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Footer com preço e botão */}
          <div className="flex items-center justify-between gap-2 mt-auto">
            {/* Preço responsivo */}
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
              {formatCurrency(firstVariant?.price || 0)}
            </span>

            {/* Botão responsivo */}
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading}
              className="shrink-0 h-8 sm:h-9 md:h-10 px-3 sm:px-4 text-xs sm:text-sm"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline ml-2">Adicionar</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};