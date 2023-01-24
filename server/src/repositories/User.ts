import UserModel from '../models/user.model';
import { IUserModel } from '../models/user.model';

export interface IUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IUserRepository {
  getUserById(id: string): Promise<IUserModel>;
}

class UserRepository implements IUserRepository {
  public async getUsers(skip: number, size: number) {
    const users = await UserModel.find({}, { email: 0, password: 0 })
      .skip(skip)
      .limit(size)
      .exec();
    return users;
  }
  public async getUserById(id: string) {
    const user = await UserModel.findById(id).exec();
    return user;
  }
  public async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ email }).exec();
    return user;
  }
}
export default new UserRepository();
