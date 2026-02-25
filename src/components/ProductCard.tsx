import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product } from "@/data/products";
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
    if (!firstVariant) return;
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
    });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
  };

  return (
    <Link to={`/produto/${product.handle}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-semibold text-foreground truncate mb-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
            {product.description || "Camisa exclusiva Nova Wear"}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">
              {formatCurrency(product.price)}
            </span>
            <Button
              size="sm"
              className="rounded-full shadow-md shadow-primary/20"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
