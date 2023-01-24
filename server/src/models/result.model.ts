import { Schema, model, Types } from 'mongoose';

export interface IPollModel {
  poll: Types.ObjectId;
  user: Types.ObjectId;
  result: any;
  createdAt: string;
}
export const ResultCollectionName = 'results';

const Resultchema = new Schema<IPollModel>({
  poll: { type: Schema.Types.ObjectId, ref: 'polls' },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  result: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Schema.Types.String, default: new Date().toISOString() },
});

export default model<IPollModel>(ResultCollectionName, Resultchema);
