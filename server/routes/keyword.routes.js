import { Router } from 'express';
import * as KeywordController from '../controllers/keyword.controller';
const router = new Router();

router.route('/keyword').get(KeywordController.getKeyword);
router.route('/keyword').put(KeywordController.updateKeyword);

export default router;
