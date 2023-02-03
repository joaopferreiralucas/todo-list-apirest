import { Router } from 'express';
import userController from '../controllers/UserController';

const router = Router();

router.post('/users', userController.store);
router.get('/users', userController.index);

export default router;
