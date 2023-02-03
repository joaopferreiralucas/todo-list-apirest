import { Router } from 'express';

import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.post('/users', userController.store);
router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.delete('/users/:id', userController.delete);
router.put('/users', loginRequired, userController.update);

export default router;
