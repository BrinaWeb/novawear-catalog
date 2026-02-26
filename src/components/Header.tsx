import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  const totalItems = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
                          <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-primary leading-none">NW</span>
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-foreground">NOVA WEAR</span>
                  </div>
                </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Início
          </Link>
          <a href="#produtos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Camisas
          </a>
        </nav>

        <CartDrawer />
      </div>
    </header>
  );
};
