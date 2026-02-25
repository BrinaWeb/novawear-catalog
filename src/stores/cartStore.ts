import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
import { openWhatsApp, type CartItemForWhatsApp } from '@/lib/whatsapp';
import { createOrder } from '@/services/api';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: { product: Product; size: string; quantity: number }) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
  finishOnWhatsApp: (customerName: string, customerPhone: string) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(
          i => i.product.id === item.product.id && i.size === item.size
        );
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.product.id === item.product.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        
        set({
          items: get().items.map(i =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        });
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            i => !(i.product.id === productId && i.size === size)
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      finishOnWhatsApp: async (customerName: string, customerPhone: string) => {
        const { items, clearCart, getTotal } = get();
        
        if (items.length === 0) return;

        set({ isLoading: true });

        try {
          // Criar pedido no backend
          await createOrder({
            customerName,
            customerPhone,
            items: items.map(item => ({
              productId: item.product.id,
              size: item.size,
              quantity: item.quantity,
              price: item.product.price,
            })),
          });

          // Preparar itens para WhatsApp
          const whatsappItems: CartItemForWhatsApp[] = items.map(item => ({
            title: item.product.title,
            variantTitle: item.size,
            price: item.product.price,
            quantity: item.quantity,
          }));

          // Abrir WhatsApp
          openWhatsApp(whatsappItems);

          // Limpar carrinho
          clearCart();
        } catch (error) {
          console.error('Erro ao criar pedido:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'nova-wear-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
