import { Schema, model, Types, SchemaTypes } from 'mongoose';
import { UserCollectionName } from './user.model';

export interface ITokenModel {
  user: Types.ObjectId;
  refreshToken: string;
}
export const TokenCollectionName = 'tokens';

const TokenSchema = new Schema<ITokenModel>({
  user: { type: SchemaTypes.ObjectId, ref: UserCollectionName },
  refreshToken: { type: SchemaTypes.String, required: true },
});

export default model<ITokenModel>(TokenCollectionName, TokenSchema);
