import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, white 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, white 50px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative container mx-auto px-4 md:px-8 py-24 md:py-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/80 mb-6 backdrop-blur-sm border border-primary-foreground/10"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
            Nova Coleção Disponível
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Vista-se com
            <br />
            <span className="relative">
              estilo único
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none"
              >
                <path d="M2 10C50 2 100 2 150 6C200 10 250 2 298 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary-foreground/40" />
              </motion.svg>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed"
          >
            Camisas exclusivas que combinam conforto, qualidade e personalidade. 
            Feitas para quem não segue tendências — cria as suas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-black/20"
              onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Camisas
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
