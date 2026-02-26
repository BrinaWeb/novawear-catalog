import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../lib/prisma';
import logger from '../config/logger';

// Schemas de validação
const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Segredos JWT (devem estar no .env)
const JWT_SECRET = process.env.JWT_SECRET || 'seu-secret-super-secreto-aqui';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'seu-refresh-secret-super-secreto-aqui';

// Gerar tokens
function generateTokens(userId: string, email: string, role: string) {
  const accessToken = jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '15m' } // Token de acesso expira em 15 minutos
  );

  const refreshToken = jwt.sign(
    { userId, email, role },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // Refresh token expira em 7 dias
  );

  return { accessToken, refreshToken };
}

// Registrar novo usuário
export async function register(req: Request, res: Response) {
  try {
    // Validar dados
    const validatedData = registerSchema.parse(req.body);

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: 'user', // Primeiro usuário pode ser promovido manualmente a admin
      },
    });

    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    logger.info(`Novo usuário registrado: ${user.email}`);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    logger.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
}

// Login
export async function login(req: Request, res: Response) {
  try {
    // Validar dados
    const validatedData = loginSchema.parse(req.body);

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(validatedData.password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

    logger.info(`Usuário logado: ${user.email}`);

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    logger.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

// Refresh token
export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token não fornecido' });
    }

    // Verificar refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Gerar novos tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    logger.error('Erro ao renovar token:', error);
    res.status(401).json({ error: 'Refresh token inválido ou expirado' });
  }
}

// Obter perfil do usuário autenticado
export async function getProfile(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
}
