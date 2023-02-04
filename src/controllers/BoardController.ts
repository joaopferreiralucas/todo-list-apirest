/* eslint-disable max-len */
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BoardController {
  async index(req:Request, res:Response) {
    try {
      const boards = await prisma.board.findMany();
      return res.json(boards);
    } catch (e) {
      return res.json(e);
    }
  }

  async store(req:Request, res:Response) {
    try {
      const newData = req.body;
      const { userId } = req;

      const newBoard = await prisma.board.create({ data: newData });
      const newRelation = await prisma.userBoard.create({
        data: {
          user_id: userId,
          board_id: newBoard.id,
          user_level: 1,
        },
      });

      return res.json({ newBoard, newRelation });
    } catch (err:any) {
      return res.status(400).json({
        err,
      });
    }
  }

  async show(req:Request, res:Response) {
    try {
      const board = await prisma.board.findUnique({ where: { id: req.params.id } });

      return res.json(board);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new BoardController();
