import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/user').get(UserController.getUser);
router.route('/user/blogger').post(UserController.toggleBlogger);
router.route('/user/newser').post(UserController.toggleNewser);

export default router;
