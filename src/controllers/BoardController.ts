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

  async showYours(req:Request, res:Response) {
    try {
      const boards = await prisma.userBoard.findMany({ where: { user_id: req.userId } });
      return res.json(boards);
    } catch (e) {
      return res.status(400).json(2222);
    }
  }

  async addUser(req:Request, res:Response) {
    try {
      const { userId } = req;
      const levlUser:any = await prisma.userBoard.findMany({ where: { user_id: userId, board_id: req.body.board_id } });

      if (levlUser[0].user_level === 1) {
        const newUserInBoard = await prisma.userBoard.create({ data: req.body });

        return res.json(newUserInBoard);
      }
      return res.json('voce precisa ser adm da board');
    } catch (e) {
      return res.json(e);
    }
  }

  async removeUser(req:Request, res:Response) {
    try {
      const { userId } = req;
      const levlUser:any = await prisma.userBoard.findMany({ where: { user_id: userId, board_id: req.body.board_id } });

      if (levlUser[0].user_level === 1) {
        const deletedUser = await prisma.userBoard.delete({ where: { id: req.body } });

        return res.json(deletedUser);
      }
      return res.json('voce precisa ser adm da board');
    } catch (e) {
      return res.status(400).json(2223);
    }
  }

  async viewUsers(req:Request, res:Response) {
    try {
      const boards = await prisma.userBoard.findMany({ where: { board_id: req.body } });
      return res.json(boards);
    } catch (e) {
      return res.status(400).json(2224);
    }
  }
}

export default new BoardController();
