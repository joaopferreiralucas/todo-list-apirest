import express from 'express';
import dotenv from 'dotenv';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import boardRoutes from './routes/boardRoutes';
import userBoardRoutes from './routes/userBoardRoutes';

dotenv.config();

class App {
  app:express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/boards', userBoardRoutes);
    this.app.use('/', boardRoutes);
    this.app.use('/', homeRoutes);
    this.app.use('/', userRoutes);
  }
}

export default new App().app;
