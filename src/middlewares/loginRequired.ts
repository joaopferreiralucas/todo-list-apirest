import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req:Request, res:Response, next:any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  const secret:any = process.env.TOKEN_SECRET;

  try {
    const dados = jwt.verify(token, secret);
    const { id }:any = dados;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario invalido'],
      });
    }

    req.userId = user.id;
    req.userEmail = user.email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado'],
    });
  }
};
