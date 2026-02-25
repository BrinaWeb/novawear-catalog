// Dados locais dos produtos NovaWear

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: number;
  currencyCode: string;
  image: string;
  variants: {
    id: string;
    title: string;
    price: number;
  }[];
}

export const products: Product[] = [
  {
    id: "1",
    title: "Camiseta Diesel Branca",
    description: "Camiseta Diesel básica em algodão premium. Design minimalista com logo discreto no peito. Perfeita para looks casuais e modernos.",
    handle: "camiseta-diesel-branca",
    price: 189.90,
    currencyCode: "BRL",
    image: "/images/camisa-diesel-branca.jpeg",
    variants: [
      { id: "1-p", title: "P", price: 189.90 },
      { id: "1-m", title: "M", price: 189.90 },
      { id: "1-g", title: "G", price: 189.90 },
      { id: "1-gg", title: "GG", price: 189.90 },
    ],
  },
  {
    id: "2",
    title: "Camiseta Calvin Klein Branca",
    description: "Camiseta Calvin Klein em malha de alta qualidade. Logo CK bordado no peito. Elegante e versátil para o dia a dia.",
    handle: "camiseta-ck-branca",
    price: 159.90,
    currencyCode: "BRL",
    image: "/images/camisa-ck-branca.jpeg",
    variants: [
      { id: "2-p", title: "P", price: 159.90 },
      { id: "2-m", title: "M", price: 159.90 },
      { id: "2-g", title: "G", price: 159.90 },
      { id: "2-gg", title: "GG", price: 159.90 },
    ],
  },
  {
    id: "3",
    title: "Camiseta Lacoste Sport Branca",
    description: "Camiseta Lacoste Sport em tecido respirável. Ideal para atividades físicas e uso casual. Logo crocodilo bordado.",
    handle: "camiseta-lacoste-branca",
    price: 199.90,
    currencyCode: "BRL",
    image: "/images/camisa-lacoste-branca.jpeg",
    variants: [
      { id: "3-p", title: "P", price: 199.90 },
      { id: "3-m", title: "M", price: 199.90 },
      { id: "3-g", title: "G", price: 199.90 },
      { id: "3-gg", title: "GG", price: 199.90 },
    ],
  },
  {
    id: "4",
    title: "Camiseta Tommy Hilfiger Preta",
    description: "Camiseta Tommy Hilfiger em algodão premium. Cor preta clássica com logo bordado. Corte regular fit confortável.",
    handle: "camiseta-tommy-preta",
    price: 179.90,
    currencyCode: "BRL",
    image: "/images/camisa-tommy-preta.jpeg",
    variants: [
      { id: "4-p", title: "P", price: 179.90 },
      { id: "4-m", title: "M", price: 179.90 },
      { id: "4-g", title: "G", price: 179.90 },
      { id: "4-gg", title: "GG", price: 179.90 },
    ],
  },
  {
    id: "5",
    title: "Camiseta Lacoste Azul Marinho",
    description: "Camiseta Lacoste em tom azul marinho sofisticado. Tecido de alta qualidade com logo crocodilo. Perfeita para ocasiões casuais e semi-formais.",
    handle: "camiseta-lacoste-azul",
    price: 209.90,
    currencyCode: "BRL",
    image: "/images/camisa-lacoste-azul.jpeg",
    variants: [
      { id: "5-p", title: "P", price: 209.90 },
      { id: "5-m", title: "M", price: 209.90 },
      { id: "5-g", title: "G", price: 209.90 },
      { id: "5-gg", title: "GG", price: 209.90 },
    ],
  },
  {
    id: "6",
    title: "Camiseta Polo Ralph Lauren Preta",
    description: "Camiseta Polo Ralph Lauren em algodão premium. Cor preta elegante com logo cavalinho vermelho bordado. Qualidade e sofisticação em uma peça clássica.",
    handle: "camiseta-polo-ralph-preta",
    price: 229.90,
    currencyCode: "BRL",
    image: "/images/camisa-polo-ralph-preta.jpeg",
    variants: [
      { id: "6-p", title: "P", price: 229.90 },
      { id: "6-m", title: "M", price: 229.90 },
      { id: "6-g", title: "G", price: 229.90 },
      { id: "6-gg", title: "GG", price: 229.90 },
    ],
  },
];

export const getProductByHandle = (handle: string): Product | undefined => {
  return products.find((p) => p.handle === handle);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
