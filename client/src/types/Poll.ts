import { IQuestion } from 'src/types/Question';
export interface IParams {
  isAnonymous?: boolean;
  isRandomOrder?: boolean;
  showPageNumbers?: boolean;
  showProgressBar?: boolean;
  showQuestionNumbers?: boolean;
  showRequired?: boolean;
}

export interface IPoll {
  pages: { title: string; questions: IQuestion[] }[];
  params: IParams;
  title: string;
  updatedAt?: string;
  totalResults?: number;
  user?: string;
}

export interface IResultPoll {
  _id: string;
  poll: IPoll;
  updatedAt: string;
  totalResults: number;
  user: string;
}
export interface IPolls {
  polls: IResultPoll[];
  totalItems: number;
  totalResults: number;
}
