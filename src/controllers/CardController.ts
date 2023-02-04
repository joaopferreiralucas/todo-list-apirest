/* eslint-disable max-len */
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CardController {
  async index(req:Request, res:Response) {
    try {
      const cards = await prisma.card.findMany();
      return res.json(cards);
    } catch (e) {
      return res.json(e);
    }
  }

  async store(req:Request, res:Response) {
    try {
      const newCard = await prisma.card.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          board_id: req.body.board_id,
        },
      });

      return res.json(newCard);
    } catch (e) {
      res.status(400).json(e);
    }

    return res.status(400).json('erro desocnhecido');
  }

  async show(req:Request, res:Response) {
    try {
      const card = await prisma.card.findUnique({ where: { id: req.params.id } });

      return res.json(card);
    } catch (e) {
      res.status(400).json(e);
    }

    return res.status(400).json('erro');
  }

  async update(req:Request, res:Response) {
    try {
      const { userId } = req;
      const levlUser:any = await prisma.userBoard.findMany({ where: { user_id: userId, board_id: req.body.board_id } });
      const data: any = req.body;

      if (levlUser[0].user_level === 1) {
        const editedCard = await prisma.card.update({ where: { id: req.body.id }, data });

        return res.json(editedCard);
      }
      return res.json('voce precisa ser adm da board');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req:Request, res:Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID nao enviado'],
        });
      }

      const user = await prisma.card.findUnique({ where: { id: req.params.id } });

      if (!user) {
        return res.status(400).json({
          errors: ['card nao existe'],
        });
      }

      const { userId } = req;
      const levlUser:any = await prisma.userBoard.findMany({ where: { user_id: userId, board_id: req.body.board_id } });

      if (levlUser[0].user_level === 1) {
        const card = await prisma.card.delete({ where: { id: req.params.id } });
        return res.json({
          card,
          msg: ['Este card foi deletado'],
        });
      }
    } catch (e:any) {
      return res.status(400).json({
        errors: e.errors.map((err:any) => err.message),
      });
    }

    return res.status(400).json('erro');
  }
}

export default new CardController();
