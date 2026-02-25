import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

// Schema de validação para criar/atualizar produto
const productSchema = z.object({
  handle: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.string().default('camisas'),
  sizes: z.array(z.string()).default(['P', 'M', 'G', 'GG']),
  colors: z.array(z.string()).optional(),
  inStock: z.boolean().default(true),
});

// Listar todos os produtos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { createdAt: 'desc' },
    });

    // Converter sizes e colors de JSON string para array
    const formattedProducts = products.map(p => ({
      ...p,
      sizes: JSON.parse(p.sizes),
      colors: p.colors ? JSON.parse(p.colors) : [],
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Buscar produto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({
      ...product,
      sizes: JSON.parse(product.sizes),
      colors: product.colors ? JSON.parse(product.colors) : [],
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Buscar produto por handle
export const getProductByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const product = await prisma.product.findUnique({ where: { handle } });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({
      ...product,
      sizes: JSON.parse(product.sizes),
      colors: product.colors ? JSON.parse(product.colors) : [],
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Criar novo produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = productSchema.parse(req.body);
    
    const product = await prisma.product.create({
      data: {
        ...data,
        sizes: JSON.stringify(data.sizes),
        colors: data.colors ? JSON.stringify(data.colors) : null,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

// Atualizar produto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = productSchema.partial().parse(req.body);

    const updateData: any = { ...data };
    if (data.sizes) updateData.sizes = JSON.stringify(data.sizes);
    if (data.colors) updateData.colors = JSON.stringify(data.colors);

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

// Deletar produto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};
