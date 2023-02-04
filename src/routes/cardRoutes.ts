import { Router } from 'express';

import cardController from '../controllers/CardController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/', loginRequired, cardController.index);
router.post('/', loginRequired, cardController.store);
router.get('/:id', loginRequired, cardController.show);

router.put('/', loginRequired, cardController.update);
router.delete('/:id', loginRequired, cardController.delete);

export default router;
