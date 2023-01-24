export enum QuestionType {
  ONE_ANSWER = 'ONE_ANSWER',
  SEVERAL_ANSWERS = 'SEVERAL_ANSWERS',
  TEXT_ANSWER = 'TEXT_ANSWER',
  RANGE_ANSWER = 'RANGE_ANSWER',
  RATING_ANSWER = 'RATING_ANSWER',
}

export interface IQuestion {
  id: string;
  required?: boolean;
  title: string;
  type: QuestionType;
  value?: string[] | number | string;
  text?: string;
  first?: string;
  second?: string;
  third?: string;
}

export interface IEditableQuestion {
  required?: boolean;
  first?: string;
  second?: string;
  third?: string;
  title?: string;
}
