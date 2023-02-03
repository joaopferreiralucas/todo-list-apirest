import { Response } from 'express';

class HomeController {
  index(req:any, res:Response) {
    res.json('Index Home');
  }
}

export default new HomeController();
