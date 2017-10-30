import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';
const router = new Router();

router.route('/categories').get(CategoryController.getCategories);
router.route('/category').post(CategoryController.createCategory);
router.route('/category').put(CategoryController.updateCategory);

export default router;
