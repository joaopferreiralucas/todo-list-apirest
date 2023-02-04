import { Request } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);
const errorCode:any = 'Arquivo pricsa ser png, jpg ou pdf';

export default {
  fileFilter: (req:Request, file:any, cb:Function) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'application/pdf') {
      return cb(new multer.MulterError(errorCode));
    }
    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
