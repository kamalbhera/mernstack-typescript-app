import { FC } from 'react';

import { QuestionType } from 'src/types/Question';
import { IAnswer, IStatisticResult } from 'src/types/Results';

import { ChartResult } from './ChartResult';
import { ListResult } from './ListResult';
import styles from './styles.module.scss';

interface Props {
  statisticsData: IStatisticResult | null;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  order: { [key: number]: { type: QuestionType; order: string[] } };
}
const StatisticResult: FC<Props> = ({
  statisticsData,
  currentPage,
  setCurrentPage,
  order,
}) => {
  if (!statisticsData) return null;
  const { statistic } = statisticsData;

  const sortedValues = statistic?.pages[currentPage].answers.map(
    (answer: any, i: number) => {
      if (
        answer.type === QuestionType.ONE_ANSWER ||
        answer.type === QuestionType.SEVERAL_ANSWERS
      ) {
        return {
          ...answer,
          value: Object.fromEntries(
            Object.entries(answer.value).sort(
              (first: any, second: any) =>
                order?.[i]?.order.indexOf(first[0]) -
                order?.[i]?.order.indexOf(second[0]),
            ),
          ),
        };
      }
      return answer;
    },
  );

  return (
    <>
      <div className={styles.result__pages}>
        {statistic.pages.map(
          (
            item: {
              answers: {
                answers: {
                  title: string;
                  totalAnswers: number;
                  type: QuestionType;
                  value: { [key: string]: number };
                };
              }[];
              title: string;
            },
            i: number,
          ) => {
            return (
              <div
                key={`${item.title}${i.toString()}`}
                className={currentPage === i ? styles.result__active_page : ''}
                role="presentation"
                onClick={() => setCurrentPage(i)}
              >
                {item.title}
              </div>
            );
          },
        )}
      </div>
      <div className={styles.result__main}>
        {Object.values(sortedValues).map((answer: IAnswer, i: number) => {
          return answer.type !== QuestionType.TEXT_ANSWER ? (
            <ChartResult
              key={`${answer.title}${i.toString()}`}
              answer={answer}
              totalResults={statistic.totalResults}
            />
          ) : (
            <ListResult
              key={`${answer.title}${i.toString()}`}
              answer={answer}
              totalResults={statistic.totalResults}
            />
          );
        })}
      </div>
    </>
  );
};
export default StatisticResult;
