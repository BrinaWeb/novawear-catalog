import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    handle: 'camisa-classica-azul',
    title: 'Camisa Clássica Azul',
    description: 'Camisa social clássica em tom azul marinho, perfeita para ocasiões formais e casuais.',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    category: 'camisas',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Azul Marinho']),
    inStock: true,
  },
  {
    handle: 'camisa-polo-branca',
    title: 'Camisa Polo Branca',
    description: 'Polo clássica branca com acabamento premium, ideal para o dia a dia.',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1625910513413-5fc45e80b24b?w=800',
    category: 'polos',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Branco']),
    inStock: true,
  },
  {
    handle: 'camisa-casual-listrada',
    title: 'Camisa Casual Listrada',
    description: 'Camisa casual com listras modernas, combina estilo e conforto.',
    price: 139.90,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800',
    category: 'camisas',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Azul', 'Branco']),
    inStock: true,
  },
  {
    handle: 'camisa-social-preta',
    title: 'Camisa Social Preta',
    description: 'Elegância atemporal em uma camisa social preta de corte impecável.',
    price: 179.90,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800',
    category: 'camisas',
    sizes: JSON.stringify(['P', 'M', 'G', 'GG']),
    colors: JSON.stringify(['Preto']),
    inStock: true,
  },
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Inserir produtos
  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log(`✅ Produto criado: ${product.title}`);
  }

  console.log('\n🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
