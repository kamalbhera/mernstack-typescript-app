import { IParams } from './Poll';
import { QuestionType } from './Question';

export interface IResultByPollId {
  createdAt: string;
  user: { name: string; _id: string };
  _id: string;
}

export interface IResultsByPollId {
  results: IResultByPollId[];
}

export interface IAnswer {
  title: string;
  type: QuestionType;
  first?: string;
  second?: string;
  third?: string;
  value: number | string | string[];
  totalAnswers?:number;
}

export interface IStatisticResult {
  statistic: {
    pages: {
      answers: {
        answers: {
          title: string;
          totalAnswers: number;
          type: QuestionType;
          value: { [key: string]: number };
        };
      }[];
      title: string;
    }[];
    title: string;
    totalResults: number;
  };
}

export interface IStatisticSeparateResult {
  pages: { [key: string]: IAnswer }[];
  title: string;
}

export interface IPollResult {
  pages:
    | ({
        answers: { [key: string]: IAnswer };
        title: string;
      } | null)[];
  title: string;
}

export interface ICreateResult {
  params: IParams;
  result: IPollResult;
  pollId: string | null;
  userId: string | null;
}
