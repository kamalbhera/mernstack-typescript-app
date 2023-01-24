import express, { Router } from 'express';
import templateController from '../controllers/template.controller';
import authMiddleware from '../middleware/auth.middleware';

const router: Router = express.Router();

const baseUrl = '/';

router.get(baseUrl, authMiddleware, templateController.getAll);
router.get(`${baseUrl}:templateId`, authMiddleware, templateController.getById);
router.post(baseUrl, authMiddleware, templateController.create);
router.put(`${baseUrl}:templateId`, authMiddleware, templateController.update);
router.delete(
  `${baseUrl}:templateId`,
  authMiddleware,
  templateController.delete,
);

export default router;
