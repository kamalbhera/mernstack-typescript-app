import express, { Router } from 'express';
import resultController from '../controllers/result.controller';

const router: Router = express.Router();

const baseUrl = '/';

router.post(baseUrl, resultController.create);
router.get(`${baseUrl}id/:resultId`, resultController.getResultByResultId);
router.get(`${baseUrl}statistic/:pollId`, resultController.getStatisticResults);
router.get(`${baseUrl}:pollId`, resultController.getResultsByPollId);

export default router;
