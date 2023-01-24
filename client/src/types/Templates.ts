import { IQuestion } from 'src/types/Question';
import { IParams } from 'src/types/Poll';

export interface ITemplates {
  templates: ITemplate[];
  totalItems: number;
}

export interface ITemplate {
  _id: string;
  template: {
    pages: { questions: IQuestion[]; title: string }[];
    params: IParams;
    title: string;
  };
  updatedAt: string;
}
export interface ICreateTemplate {
  pages: { queston: IQuestion[]; title: string }[];
  params: IParams;
  title: string;
}
