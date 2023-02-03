import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcryptjs';

import UserValidator from '../validators/UserValidator';

const validator = new UserValidator();

const prisma = new PrismaClient();

class UserController {
  async store(req:Request, res:Response) {
    const data:any = await validator.validAll(req.body);

    if (data.error) {
      return res.status(400).json(data);
    }

    try {
      const newUser = await prisma.user.create({ data });

      return res.json(newUser);
    } catch (err:any) {
      return res.status(400).json({
        err,
      });
    }
  }

  async index(req:Request, res:Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req:Request, res:Response) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.params.id } });

      return res.json(user);
    } catch (e) {
      return res.json(e);
    }
  }

  async delete(req:Request, res:Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID nao enviado'],
        });
      }

      const user = await prisma.user.findUnique({ where: { id: req.params.id } });

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario nao existe'],
        });
      }

      await prisma.user.delete({ where: { id: req.params.id } });
      return res.json({
        usuario: user,
        msg: ['Este usuario foi deletado'],
      });
    } catch (e:any) {
      return res.status(400).json({
        errors: e.errors.map((err:any) => err.message),
      });
    }
  }

  async update(req:Request, res:Response) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.userId } });

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario nao existe'],
        });
      }

      const newPassword = await bcrypt.hash(req.body.password, 8);
      const data: any = req.body;
      data.password = newPassword;

      const novosDados = await prisma.user.update({ where: { id: req.userId }, data });
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new UserController();
