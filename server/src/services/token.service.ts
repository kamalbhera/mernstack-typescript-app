import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import TokenRepository from '../repositories/Token';

dotenv.config();

class tokenService {
  generateTokens(payload, rememberMe) {
    const accessToken: string = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: '5d',
    });
    const refreshToken: string = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: rememberMe ? '60d' : '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenRepository.getToken('user', userId);
    if (tokenData) {
      await TokenRepository.updateToken(tokenData._id.toString(), {
        user: userId,
        refreshToken,
      });
      return;
    }
    const token = await TokenRepository.createToken({
      user: userId,
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenRepository.deleteToken(refreshToken);
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenRepository.getToken(
      'refreshToken',
      refreshToken,
    );
    return tokenData;
  }
}

export default new tokenService();
