import express, { Router } from 'express';
const { check } = require('express-validator');

import userController from '../controllers/user.controller';
import authMiddleware from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/login', userController.logIn);
router.post(
  '/signup',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Minimal lenth should be 6 symbols').isLength({ min: 6 }),
  ],
  userController.signUp,
);
router.post('/refresh', userController.refresh);
router.get('/getAllUsers', authMiddleware, userController.getAll);

export default router;
