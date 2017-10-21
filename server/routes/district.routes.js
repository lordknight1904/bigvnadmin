import { Router } from 'express';
import * as DistrictController from '../controllers/district.controller';
const router = new Router();

router.route('/district').post(DistrictController.createDistrict);
router.route('/district/toggle').post(DistrictController.toggleDistrict);
router.route('/district').get(DistrictController.getDistrictsAll);
router.route('/district/:cityId').get(DistrictController.getDistricts);
router.route('/district').get(DistrictController.getDistricts);

export default router;
