import { ProductCard } from "./ProductCard";
import { PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";

export const ProductGrid = () => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <PackageOpen className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-4" />
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md text-center">
          A loja ainda não possui produtos cadastrados.
        </p>
      </div>
    );
  }

  return (
    <div 
      id="produtos"
            className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      {/* Grid responsivo com Mobile First */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};