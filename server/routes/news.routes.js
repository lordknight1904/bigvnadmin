import { Router } from 'express';
import * as NewsController from '../controllers/news.controller';
const router = new Router();

router.route('/news').get(NewsController.getNews);
router.route('/news/toggle').post(NewsController.toggleNews);
router.route('/news/vip').post(NewsController.vipNews);

export default router;
