import { ProductCard } from "./ProductCard";
import { PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";

export const ProductGrid = () => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageOpen className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
        <p className="text-muted-foreground max-w-md">
          A loja ainda não possui produtos cadastrados. Em breve novas camisas estarão disponíveis!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};
