import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Minus, Plus, Trash2, MessageCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/lib/whatsapp";
import { toast } from "sonner";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const { items, isLoading, updateQuantity, removeItem, getTotal, getTotalItems, finishOnWhatsApp } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotal();

  const handleWhatsAppCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error("Preencha seu nome e telefone");
      return;
    }

    try {
      await finishOnWhatsApp(customerName, customerPhone);
      setIsOpen(false);
      setShowCheckoutForm(false);
      setCustomerName("");
      setCustomerPhone("");
      toast.success("Pedido enviado! Redirecionando para WhatsApp...");
    } catch (error) {
      toast.error("Erro ao processar pedido. Tente novamente.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-[9px] sm:text-[10px] bg-primary text-primary-foreground border-2 border-background">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[400px] md:w-[450px] lg:w-[500px] flex flex-col p-0">
        <SheetHeader className="px-4 sm:px-6 py-4 sm:py-5 border-b">
          <SheetTitle className="text-lg sm:text-xl">Carrinho de Compras</SheetTitle>
          <SheetDescription className="text-xs sm:text-sm">
            {totalItems === 0 ? "Seu carrinho está vazio" : `${totalItems} ${totalItems === 1 ? "item" : "itens"} no carrinho`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12">
              <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground">
                Adicione produtos ao carrinho para continuar
              </p>
            </div>
          ) : showCheckoutForm ? (
            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Nome completo</Label>
                <Input id="name" placeholder="Seu nome" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="h-10 sm:h-11 text-sm sm:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base">Telefone (WhatsApp)</Label>
                <Input id="phone" type="tel" placeholder="(00) 00000-0000" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="h-10 sm:h-11 text-sm sm:text-base" />
              </div>
              <div className="bg-muted rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                <h4 className="font-semibold text-sm sm:text-base">Resumo do Pedido</h4>
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">{item.title} ({item.size}) x{item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 sm:pt-3 flex justify-between font-bold text-sm sm:text-base">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 pt-2">
                <Button onClick={handleWhatsAppCheckout} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-11 text-sm sm:text-base">
                  {isLoading ? <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> : <><MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />Finalizar no WhatsApp</>}
                </Button>
                <Button variant="outline" onClick={() => setShowCheckoutForm(false)} className="w-full h-9 sm:h-10 text-sm sm:text-base">Voltar ao Carrinho</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-lg border">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 rounded-md overflow-hidden bg-muted">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base line-clamp-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Tamanho: {item.size}</p>
                    <p className="text-sm sm:text-base font-bold text-primary mt-1 sm:mt-2">{formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                      <div className="flex items-center gap-1 sm:gap-2 border rounded-md">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))} className="h-7 w-7 sm:h-8 sm:w-8"><Minus className="h-3 w-3 sm:h-4 sm:w-4" /></Button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="h-7 w-7 sm:h-8 sm:w-8"><Plus className="h-3 w-3 sm:h-4 sm:w-4" /></Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.size)} className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !showCheckoutForm && (
          <div className="border-t p-4 sm:p-6 space-y-3 sm:space-y-4 bg-background">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-medium">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
            </div>
            <Button onClick={() => setShowCheckoutForm(true)} className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-11 md:h-12 text-sm sm:text-base"><MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />Finalizar no WhatsApp</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};