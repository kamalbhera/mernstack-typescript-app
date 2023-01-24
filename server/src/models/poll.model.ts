import { Schema, model, Types, SchemaDefinition } from 'mongoose';

export enum QuestionType {
  ONE_ANSWER = 'ONE_ANSWER',
  SEVERAL_ANSWERS = 'SEVERAL_ANSWERS',
  TEXT_ANSWER = 'TEXT_ANSWER',
  RANGE_ANSWER = 'RANGE_ANSWER',
  RATING_ANSWER = 'RATING_ANSWER',
}
export interface IQuestion {
  id: string;
  required: boolean;
  title: string;
  type: QuestionType;
  value?: string[] | number | string;
  text?: string;
  first?: string;
  second?: string;
  third?: string;
}
export interface IPollParams {
  isAnonymous: boolean;
  isRandomOrder: boolean;
  showPageNumbers: boolean;
  showProgressBar: boolean;
  showQuestionNumbers: boolean;
  showRequired: boolean;
}
export interface IPoll {
  params: IPollParams;
  pages: { title: string; questions: IQuestion[] }[];
  title: string;
}
export interface IPollModel {
  poll: IPoll;
  user: Types.ObjectId;
  updatedAt: string;
  totalResults: number;
}
export const PollCollectionName = 'polls';

const PollSchema = new Schema<IPollModel>({
  poll: { type: Schema.Types.Mixed, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  updatedAt: { type: Schema.Types.String, default: new Date().toISOString() },
  totalResults: { type: Number, min: 0 },
});

export default model<IPollModel>(PollCollectionName, PollSchema);
