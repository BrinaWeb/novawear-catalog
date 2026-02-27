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
      <div className="flex flex-col h-full">
        {/* Container de imagem - ocupa mais espaço */}
        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badge de categoria - apenas desktop */}
          {product.category && (
            <div className="absolute top-2 left-2 hidden sm:block">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Conteúdo compacto */}
        <div className="flex flex-col gap-2 px-3">
          {/* Categoria mobile - texto pequeno */}
          {product.category && (
            <p className="text-[10px] sm:hidden text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
          )}
          
          {/* Título compacto */}
          <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
            {product.title}
          </h3>

          {/* Descrição apenas desktop */}
          <p className="hidden md:block text-sm text-gray-600 line-clamp-2 mb-2">
            {product.description}
          </p>

          {/* Preço destacado */}
          <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {formatCurrency(firstVariant?.price || 0)}
          </p>

          {/* Botão compacto */}
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full h-10 sm:h-11 bg-black hover:bg-gray-800 text-white text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-2">Adicionar</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};