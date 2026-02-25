// Utilitário para gerar link do WhatsApp com pedido

export interface CartItemForWhatsApp {
  title: string;
  variantTitle?: string;
  price: number;
  quantity: number;
}

// Número do WhatsApp do cliente (formato: 55 + DDD + número)
// Exemplo: 5511999999999
export const WHATSAPP_NUMBER = "5548999304456"; // TODO: Substituir pelo número real do cliente
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const generateWhatsAppMessage = (items: CartItemForWhatsApp[]): string => {
  const itemsList = items
    .map((item) => {
      const variant = item.variantTitle ? ` (${item.variantTitle})` : "";
      const itemTotal = item.price * item.quantity;
      return `\u2022 ${item.title}${variant} - ${item.quantity}x ${formatCurrency(item.price)} = ${formatCurrency(itemTotal)}`;
    })
    .join("\n");

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const message = `📭 *Pedido NovaWear*

📦 *Itens:*
${itemsList}

💰 *Total: ${formatCurrency(total)}*

Olá! Gostaria de finalizar este pedido.`;

  return message;
};

export const generateWhatsAppLink = (items: CartItemForWhatsApp[]): string => {
  const message = generateWhatsAppMessage(items);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (items: CartItemForWhatsApp[]): void => {
  const link = generateWhatsAppLink(items);
  window.open(link, "_blank");
};
