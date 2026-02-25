import { Product, Order, CreateOrderInput } from '../types';

// URL base da API - usar variável de ambiente ou fallback para localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ==================== PRODUTOS ====================

/**
 * Busca todos os produtos
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  
  return response.json();
}

/**
 * Busca produto por ID
 */
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/id/${id}`);
  
  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }
  
  return response.json();
}

/**
 * Busca produto por handle (slug)
 */
export async function getProductByHandle(handle: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/handle/${handle}`);
  
  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }
  
  return response.json();
}

// ==================== PEDIDOS ====================

/**
 * Cria um novo pedido
 */
export async function createOrder(orderData: CreateOrderInput): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar pedido');
  }
  
  return response.json();
}

/**
 * Busca pedido por ID
 */
export async function getOrderById(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${id}`);
  
  if (!response.ok) {
    throw new Error('Pedido não encontrado');
  }
  
  return response.json();
}

/**
 * Lista todos os pedidos
 */
export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar pedidos');
  }
  
  return response.json();
}
