/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import multer from 'multer';
import multerConfig from '../config/multerConfig';

const prisma = new PrismaClient();

const upload = multer(multerConfig).single('file');

class FileController {
  store(req:Request, res:Response) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename }:any = req.file;
        const { card_id } = req.body;
        const data:any = {
          originalname, filename, card_id, url: `${process.env.APP_URL}/${filename}`,
        };
        const file = await prisma.file.create({ data });

        return res.json(file);
      } catch (e) {
        return res.status(400).json({
          errors: ['Card nao existe', e],
        });
      }
    });
  }
}

export default new FileController();
