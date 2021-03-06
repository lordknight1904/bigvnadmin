import { Router } from 'express';
import * as WardController from '../controllers/ward.controller';
const router = new Router();

router.route('/ward').post(WardController.createWard);
router.route('/ward').put(WardController.editWard);
router.route('/ward').get(WardController.getWardsAll);
router.route('/ward/:districtId').get(WardController.getWards);
router.route('/ward').get(WardController.none);

export default router;
