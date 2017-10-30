import { Router } from 'express';
import * as TopicController from '../controllers/topic.controller';
const router = new Router();

router.route('/topics').get(TopicController.getTopics);
router.route('/topic').post(TopicController.createTopic);
router.route('/topic').put(TopicController.updateTopic);
router.route('/topic/toggle').post(TopicController.toggleTopic);

export default router;
