import { Router } from 'express';
import * as BannerController from '../controllers/banner.controller';
const router = new Router();

router.route('/banner').post(BannerController.createBanner);
router.route('/banners').get(BannerController.getBanner);
router.route('/banner/toggle').post(BannerController.toggleBanner);
router.route('/banner/photo').post(BannerController.uploadBanner);

export default router;
