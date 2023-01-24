import { Schema, model, SchemaTypes } from 'mongoose';

export interface IUserModel {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  totalPolls: number;
}
export const UserCollectionName = 'users';

const UserSchema = new Schema<IUserModel>({
  name: { type: SchemaTypes.String, required: true },
  email: { type: SchemaTypes.String, required: true },
  password: { type: SchemaTypes.String, required: true },
  isAdmin: { type: SchemaTypes.Boolean, default: false },
  createdAt: { type: Schema.Types.String, default: new Date().toISOString() },
  totalPolls: { type: SchemaTypes.Number },
});

export default model<IUserModel>(UserCollectionName, UserSchema);
