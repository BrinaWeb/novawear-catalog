import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  const totalItems = useCartStore(state => state.items.length);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - Responsivo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="/images/logo.png" 
            alt="Nova Wear Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
          />
        </Link>

        {/* Navegação - Adaptável */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link 
            to="/" 
            className="text-sm lg:text-base font-medium transition-colors hover:text-primary"
          >
            Início
          </Link>
          <a 
            href="#produtos" 
            className="text-sm lg:text-base font-medium transition-colors hover:text-primary"
          >
            Camisas
          </a>
        </nav>

        {/* Carrinho - Sempre visível */}
        <div className="flex items-center gap-2 sm:gap-4">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};