import { Response, Request } from 'express';
// import tokenService from '../services/token.service';

interface UserAuthInfoRequest extends Request {
  userId: string;
}

const authMiddleware = (req: UserAuthInfoRequest, res: Response, next) => {
  if (req.method === 'OPTIONS') next();
  try {
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(401).json({
    //     message: 'User is not authed',
    //   });
    // }

    // const accessToken = authHeader.split(' ')[1];
    // if (!accessToken) {
    //   return res.status(401).json({
    //     message: 'User is not authed',
    //   });
    // }

    // const userData = tokenService.validateAccessToken(accessToken);
    // if (!userData) {
    //   return res.status(401).json({
    //     message: 'User is not authed',
    //   });
    // }

    // req.userId = userData;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Invalid acess token' });
  }
};

export default authMiddleware;
