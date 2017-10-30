import { Router } from 'express';
import * as CityController from '../controllers/city.controller';
const router = new Router();

router.route('/city').post(CityController.createCity);
router.route('/city').put(CityController.editCity);
router.route('/city/toggle').post(CityController.toggleCity);
router.route('/city').get(CityController.getCities);
router.route('/cityAll').get(CityController.getCitiesAll);

export default router;
