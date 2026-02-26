import { ShoppingBag } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-auto">
      {/* Container responsivo com padding fluido */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
        {/* Grid responsivo: 1 coluna (mobile)  2 (md)  3 (lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center md:items-start">
          
          {/* Logo e nome - centralizado em mobile, alinhado à esquerda em desktop */}
          <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
              <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight">
                Nova Wear
              </span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center md:text-left max-w-xs">
              Moda masculina de qualidade premium
            </p>
          </div>

          {/* Copyright - centralizado em todas as telas */}
          <div className="text-center order-last md:order-none">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              © {new Date().getFullYear()} Nova Wear. Todos os direitos reservados.
            </p>
          </div>

          {/* Redes sociais ou links - centralizado em mobile, alinhado à direita em desktop */}
          <div className="flex justify-center md:justify-end">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Desenvolvido com ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};