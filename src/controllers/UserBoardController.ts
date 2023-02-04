/* eslint-disable max-len */
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserBoardController {
  async index(req:Request, res:Response) {
    try {
      const boards = await prisma.userBoard.findMany();
      return res.json(boards);
    } catch (e) {
      return res.json(e);
    }
  }

  async showYours(req:Request, res:Response) {
    try {
      const boards = await prisma.userBoard.findMany({ where: { user_id: req.userId } });
      return res.json(boards);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async addUser(req:Request, res:Response) {
    try {
      const { userId } = req;
      const levlUser:any = await prisma.userBoard.findMany({ where: { user_id: userId, board_id: req.body.board_id } });

      if (levlUser[0].user_level === 1) {
        const exist = await prisma.userBoard.findMany({ where: { board_id: req.body.board_id, user_id: req.body.user_id } });

        if (exist.length > 0) {
          return res.status(400).json('este usuario ja esta na board');
        }

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
        const deletedUser = await prisma.userBoard.delete({ where: { id: req.body.id } });

        return res.json(deletedUser);
      }
      return res.json('voce precisa ser adm da board');
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async viewUsers(req:Request, res:Response) {
    try {
      const boards = await prisma.userBoard.findMany({ where: { board_id: req.body.board_id } });
      return res.json(boards);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new UserBoardController();
