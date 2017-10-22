import { Router } from 'express';
import * as BlogController from '../controllers/blog.controller';
const router = new Router();

router.route('/blogs').get(BlogController.getBlog);
router.route('/blog').post(BlogController.createBlog);
router.route('/blog/toggle').post(BlogController.toggleBlog);
router.route('/blog/photo').post(BlogController.uploadImage);

export default router;
