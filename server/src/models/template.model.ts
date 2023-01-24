import { Schema, model } from 'mongoose';

import { IPollParams } from './poll.model';

export interface ITemplateModel {
  template: any;
  params: IPollParams;
  updatedAt: string;
  totalResults: number;
}
export const UserCollectionName = 'templates';

const TemplateSchema = new Schema<ITemplateModel>({
  template: { type: Schema.Types.Mixed, required: true },
  params: { type: Schema.Types.Mixed },
  updatedAt: { type: Schema.Types.String, default: new Date().toISOString() },
  totalResults: { type: Number, min: 0 },
});

export default model<ITemplateModel>(UserCollectionName, TemplateSchema);
