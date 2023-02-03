import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserController {
  async store(req:any, res:Response) {
    try {
      const newUser = await prisma.user.create({ data: req.body });

      return res.json(newUser);
    } catch (err:any) {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async index(req:any, res:Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
