import { Router } from 'express';
import * as SettingController from '../controllers/setting.controller';
const router = new Router();

router.route('/settings').get(SettingController.getSettings);
router.route('/setting').post(SettingController.createSetting);
router.route('/setting').put(SettingController.modifySetting);
router.route('/setting/toggle').post(SettingController.toggleSetting);

export default router;
