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
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-2 border-background">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Seu Carrinho</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Seu carrinho está vazio" : `${totalItems} item${totalItems !== 1 ? 's' : ''} no carrinho`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Adicione camisas para começar!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-3 rounded-xl bg-secondary/30 border border-border/50">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                        <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm">{item.product.title}</h4>
                        <p className="text-xs text-muted-foreground">Tamanho: {item.size}</p>
                        <p className="font-semibold text-sm mt-1">
                          {formatCurrency(item.product.price)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.product.id, item.size)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border/50 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-xl font-bold text-foreground">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>

                {showCheckoutForm ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="customerName" className="text-sm">Seu Nome</Label>
                      <Input
                        id="customerName"
                        placeholder="Digite seu nome"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone" className="text-sm">Seu Telefone</Label>
                      <Input
                        id="customerPhone"
                        placeholder="(11) 99999-9999"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-full"
                        onClick={() => setShowCheckoutForm(false)}
                        disabled={isLoading}
                      >
                        Voltar
                      </Button>
                      <Button 
                        onClick={handleWhatsAppCheckout} 
                        className="flex-1 rounded-full h-12 text-base font-semibold shadow-lg bg-green-600 hover:bg-green-700" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Enviar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowCheckoutForm(true)} 
                    className="w-full rounded-full h-12 text-base font-semibold shadow-lg bg-green-600 hover:bg-green-700" 
                    size="lg" 
                    disabled={items.length === 0}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Finalizar no WhatsApp
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
