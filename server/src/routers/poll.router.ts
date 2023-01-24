import express, { Router } from 'express';
import pollController from '../controllers/poll.controller';
import authMiddleware from '../middleware/auth.middleware';

const router: Router = express.Router();

const baseUrl = '/';

router.get(baseUrl, authMiddleware, pollController.getAll);
router.get(`${baseUrl}:pollId`, pollController.getById);
router.post(baseUrl, authMiddleware, pollController.create);
router.put(`${baseUrl}:pollId`, authMiddleware, pollController.update);
router.delete(`${baseUrl}:pollId`, authMiddleware, pollController.delete);

export default router;
