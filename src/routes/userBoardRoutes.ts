import { Router } from 'express';

import boardController from '../controllers/UserBoardController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/showyours', loginRequired, boardController.showYours);
router.post('/adduser', loginRequired, boardController.addUser);
router.delete('/removeuser', loginRequired, boardController.removeUser);
router.get('/viewusers', loginRequired, boardController.viewUsers);

export default router;
