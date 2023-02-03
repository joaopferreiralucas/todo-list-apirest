import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import UserValidator from '../validators/UserValidator';

dotenv.config();
const valid = new UserValidator();
const prisma = new PrismaClient();

class TokenController {
  async store(req:Request, res:Response) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais invalidas'],
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario nao existe'],
      });
    }

    if (!(await valid.comparePass(password, user.password))) {
      return res.status(401).json({
        errors: ['Senha invalida'],
      });
    }

    const { id } = user;
    const secret:any = process.env.TOKEN_SECRET;
    const token = jwt.sign({ id, email }, secret, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user.name, id, email } });
  }
}

export default new TokenController();
