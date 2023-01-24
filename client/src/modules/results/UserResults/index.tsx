import { FC } from 'react';

import { PollQuestion } from 'src/components/PollQuestion';
import { initialPoll } from 'src/consts';
import { IAnswer, IResultByPollId } from 'src/types/Results';

import styles from './styles.module.scss';
import UsersSelect from './UsersSelect';

interface Props {
  currentPage: number;
  currentResult: any;
  results: IResultByPollId[] | null;
  setCurrentPage: (value: number) => void;
  setChosenUsersResultId: (value: string | null) => void;
}
const UserResults: FC<Props> = ({
  currentPage,
  currentResult,
  results,
  setCurrentPage,
  setChosenUsersResultId,
}) => {
  if (!currentResult) return null;
  return (
    <>
      <UsersSelect
        results={results}
        setChosenUsersResultId={setChosenUsersResultId}
      />
      <div className={styles.result__pages}>
        {currentResult?.pages.map(
          (
            item: {
              answers: { [key: string]: IAnswer };
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
        {currentResult &&
          Object.entries(currentResult?.pages[currentPage]!.answers).map(
            (answer: any, i: number) => (
              <PollQuestion
                key={answer[0]}
                isResultPage
                currentPage={currentPage}
                i={i}
                poll={initialPoll}
                question={{
                  id: answer[0],
                  type: answer[1].type,
                  value: answer[1].value,
                  title: answer[1].title,
                  first: answer[1].first,
                  second: answer[1].second,
                  third: answer[1].third,
                }}
                result={currentResult}
              />
            ),
          )}
      </div>
    </>
  );
};
export default UserResults;
