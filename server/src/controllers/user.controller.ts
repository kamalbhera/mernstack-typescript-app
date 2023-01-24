import { Request as ExpressRequest, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import UserMOdel from '../models/user.model';
import { AppLogger } from '../logger';
import tokenService from '../services/token.service';
import UserRepository from '../repositories/User';

declare interface Request<T, Cookie = unknown> extends ExpressRequest {
  body: T;
  cookie: Cookie;
}

interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}
interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

// const dayInMs: number = 24 * 60 * 60 * 1000;

class userController {
  async getAll(req: Request<any>, res: Response) {
    const { skip, size } = req.query;
    try {
      const users = await UserRepository.getUsers(Number(skip), Number(size));
      if (!users) {
        const message = `There are no users`;
        AppLogger.error(message);
        return res.status(200).json({ message });
      }
      const totalItems = await UserMOdel.find({}).countDocuments();
      res.json({ users, totalItems });
    } catch (e) {
      AppLogger.error(`Cannot get users: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }

  async logIn(req: Request<LoginRequest>, res: Response) {
    const { email, password, rememberMe } = req.body;
    try {
      const user = await UserRepository.getUserByEmail(email);

      if (!user) {
        return res.status(400).json({
          message: 'Unvalid username or password',
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Wrong password, try again' });
      }
      const tokens = tokenService.generateTokens(
        { userId: user._id },
        rememberMe,
      );
      await tokenService.saveToken(user._id, tokens.refreshToken);
      // res.cookie('refreshToken', tokens.refreshToken, {
      //   maxAge: rememberMe ? 60 * dayInMs : 30 * dayInMs,
      //   httpOnly: true,
      // });
      // res.cookie('rememberMe', rememberMe, {
      //   maxAge: 60 * dayInMs,
      //   httpOnly: true,
      // });
      // res.cookie('accessToken', tokens.accessToken, {
      //   maxAge: 15 * dayInMs,
      // });
      // res.cookie('userId', `${user._id}`, {
      //   maxAge: 15 * dayInMs,
      // });
      // res.cookie('isAdmin', `${user.isAdmin}`, {
      //   maxAge: rememberMe ? 60 * dayInMs : 30 * dayInMs,
      // });
      // return res.json({ userId: user._id, isAdmin: user.isAdmin });
      return res.json({ tokens, userId: user._id, isAdmin: user.isAdmin });
    } catch (e) {
      AppLogger.error(`Cannot login with email ${email}: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
  async signUp(req: Request<SignUpRequest>, res: Response) {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'Cannot create user, missed arg',
        });
      }
      const errors = validationResult(req);
      const errMsg = errors
        .array()
        .map((err) => err.msg)
        .join('. ');

      if (!errors.isEmpty()) {
        const message = `Uncorrect registration data. ${errMsg}`;
        AppLogger.error(message);
        return res.status(400).json({
          errors: errors.array(),
          message,
        });
      }
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        const message = `User with email: ${email} already exists`;
        AppLogger.error(message);
        return res.status(400).json({ message });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserMOdel({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      AppLogger.info('New user was created');
      const tokens = tokenService.generateTokens(
        { userId: newUser._id },
        false,
      );
      await tokenService.saveToken(newUser._id, tokens.refreshToken);
      // res.cookie('refreshToken', tokens.refreshToken, {
      //   maxAge: 30 * dayInMs,
      //   httpOnly: true,
      // });
      // res.cookie('rememberMe', {
      //   maxAge: 30 * dayInMs,
      //   httpOnly: true,
      // });
      // res.cookie('accessToken', tokens.accessToken, {
      //   maxAge: 15 * dayInMs,
      // });
      // res.cookie('userId', `${newUser._id}`, {
      //   maxAge: 15 * dayInMs,
      // });
      // res.cookie('isAdmin', `${false}`, {
      //   maxAge: 30 * dayInMs,
      // });
      return res.json({ tokens, userId: newUser._id, isAdmin: false });
    } catch (e) {
      AppLogger.error(`Cannot sign up with email ${email}: ${e.message}`);
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }

  async refresh(req: Request<unknown>, res: Response) {
    const { refreshToken, rememberMe } = req.cookies;
    try {
      if (!refreshToken) {
        return res.status(400).json({
          message: 'No token',
        });
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      // Do not delete (have an influence on updating refresh token. workinkg with useRequest.ts)
      // if (!userData || !tokenFromDb) {
      if (!userData) {
        return res.status(401).json({
          message: 'User is not authed',
        });
      }
      const user = await UserRepository.getUserById(userData.userId);
      const tokens = tokenService.generateTokens(
        { userId: user._id },
        rememberMe,
      );
      await tokenService.saveToken(user._id, tokens.refreshToken);
      // res.cookie('refreshToken', tokens.refreshToken, {
      //   maxAge: rememberMe ? 60 * dayInMs : 30 * dayInMs,
      //   httpOnly: true,
      // });
      // res.cookie('accessToken', tokens.accessToken, {
      //   maxAge: 15 * 60 * 1000,
      // });
      return res.json({ tokens, userId: user._id });
    } catch (e) {
      AppLogger.error(
        `Cannot refresh tokens getting-token ${refreshToken}: ${e.message}`,
      );
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please, try later' });
    }
  }
}

export default new userController();
