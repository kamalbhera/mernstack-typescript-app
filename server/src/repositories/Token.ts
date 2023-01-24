import TokenModel from '../models/token.model';
import { ITokenModel } from '../models/token.model';

export interface IToken {
  user: string;
  refreshToken: string;
}

export interface ITokenRepository {
  getToken(key: string, id: string): Promise<ITokenModel>;
  updateToken(id: string, input: IToken): void;
  createToken(input: IToken): void;
}

class TokenRepository implements ITokenRepository {
  public async getToken(key: string, value: string) {
    const token = await TokenModel.findOne({ [key]: value }).exec();
    return token;
  }
  public async updateToken(id: string, input: IToken) {
    const token = await TokenModel.findByIdAndUpdate(id, input);
    return token;
  }
  public async deleteToken(refreshToken: string) {
    const token = await TokenModel.deleteOne({ refreshToken });

    return token;
  }
  public async createToken(input: IToken) {
    await TokenModel.create([
      {
        ...input,
      },
    ]);
  }
}
export default new TokenRepository();
