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
}

export const products: Product[] = [
  {
    id: "1",
    handle: "camiseta-diesel-branca",
    title: "Camiseta Diesel Branca",
    description: "Camiseta premium da marca Diesel, confeccionada em algodão de alta qualidade.",
    price: 79.90,
    image: "/images/camisa-1 (1).jpeg",
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco"],
    inStock: true,
  },
  {
    id: "2",
    handle: "camiseta-calvin-klein-branca",
    title: "Camiseta Calvin Klein Branca",
    description: "Camiseta clássica Calvin Klein com logo bordado, perfeita para o dia a dia.",
    price: 79.90,
    image: "/images/camisa-1 (2).jpeg",
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco"],
    inStock: true,
  },
  {
    id: "3",
    handle: "camiseta-lacoste-sport-branca",
    title: "Camiseta Lacoste Sport Branca",
    description: "Camiseta esportiva Lacoste com tecnologia de respirabilidade.",
    price: 79.90,
    image: "/images/camisa-1 (3).jpeg",
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco"],
    inStock: true,
  },
  {
    id: "4",
    handle: "camiseta-tommy-hilfiger-preta",
    title: "Camiseta Tommy Hilfiger Preta",
    description: "Camiseta Tommy Hilfiger em algodão premium com logo icônico.",
    price: 79.90,
    image: "/images/camisa-1 (4).jpeg",
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto"],
    inStock: true,
  },
  {
    id: "5",
    handle: "camiseta-lacoste-azul-marinho",
    title: "Camiseta Lacoste Azul Marinho",
    description: "Camiseta Lacoste em azul marinho com o clássico crocodilo bordado.",
    price: 79.90,
    image: "/images/camisa-1 (5).jpeg",
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul Marinho"],
    inStock: true,
  },
  {
    id: "6",
    handle: "camiseta-polo-ralph-lauren-preta",
    title: "Camiseta Polo Ralph Lauren Preta",
    description: "Camiseta polo Ralph Lauren em preto com logo bordado.",
    price: 79.90,
    image: "/images/camisa-1 (6).jpeg",
    category: "Camisas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto"],
    inStock: true,
  },

export function getProductByHandle(handle: string): Product | undefined {

    return products.find(product => product.handle === handle);git add . && git commit -m "Corrigir products.ts - adicionar funcao getProductByHandle" && git push
    