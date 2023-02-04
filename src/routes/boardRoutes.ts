import { Router } from 'express';

import boardController from '../controllers/BoardController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/boards', boardController.index);
router.post('/boards', loginRequired, boardController.store);
router.get('/boards/:id', boardController.show);

export default router;
