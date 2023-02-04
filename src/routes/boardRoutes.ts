import { Router } from 'express';

import boardController from '../controllers/BoardController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/boards', boardController.index);
router.post('/boards', loginRequired, boardController.store);
router.get('/boards/:id', boardController.show);

router.get('/boards/showyours', loginRequired, boardController.showYours);
router.post('/boards/adduser', loginRequired, boardController.addUser);
router.delete('/boards/removeuser', loginRequired, boardController.removeUser);
router.get('/boards/viewusers', loginRequired, boardController.viewUsers);

export default router;
