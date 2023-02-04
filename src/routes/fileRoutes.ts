import { Router } from 'express';

import fileController from '../controllers/FileController';

const router = Router();

router.post('/', fileController.store);

export default router;
