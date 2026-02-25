// Tipos para Product
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Tipos para Order
export interface OrderItem {
  id?: string;
  productId: string;
  productTitle?: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  customerName: string;
  customerPhone: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Tipo para criar pedido
export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  items: {
    productId: string;
    size: string;
    quantity: number;
    price: number;
  }[];
}

// Tipo para item do carrinho
export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
