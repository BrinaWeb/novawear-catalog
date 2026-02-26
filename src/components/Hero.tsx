import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradiente responsivo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-300 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[50%] bg-blue-700 rounded-full opacity-20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(255,255,255,0.1)_50px,rgba(255,255,255,0.1)_51px)]" />
      </div>

      {/* Container responsivo com padding fluido */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge responsivo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs sm:text-sm font-medium">Nova Coleção Disponível</span>
          </motion.div>

          {/* Título com tipografia fluida */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Vista-se com
            <br className="hidden sm:block" />
            <span className="block mt-1 sm:mt-2">estilo único</span>
          </h1>

          {/* Descrição responsiva */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
            Camisas exclusivas que combinam conforto, qualidade e personalidade. 
            <span className="hidden sm:inline">Feitas para quem não segue tendências — cria as suas.</span>
          </p>

          {/* Botão responsivo */}
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 h-auto"
            onClick={() => {
              document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver Camisas
            <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};