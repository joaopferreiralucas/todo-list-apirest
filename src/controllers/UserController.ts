import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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
}

export default new UserController();
