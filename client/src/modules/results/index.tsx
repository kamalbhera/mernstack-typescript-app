import { FC, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { usePoll } from 'src/api/poll';
import { useResult } from 'src/api/result';
import SidebarLayout from 'src/components/layouts/SidebarLayout';
import { Spinner } from 'src/components/Spinner';
import { TitleRow } from 'src/components/TitleRow';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { IQuestion, QuestionType } from 'src/types/Question';
import {
  IAnswer,
  IResultsByPollId,
  IStatisticResult,
  IStatisticSeparateResult,
} from 'src/types/Results';

import ResultsSwitcher from './ResultsSwithcer';
import Results from './ResultsTable';
import StatisticResult from './StatisticResult';
import styles from './styles.module.scss';
import UserResults from './UserResults';

const ResultsPage: FC = () => {
  const { t } = useTranslation();
  const { pollId = null } = useParams<string>();
  const [chosenUsersResultId, setChosenUsersResultId] = useState<string | null>(
    null,
  );
  const [currentResult, setCurrentResult] =
    useState<IStatisticSeparateResult | null>(null);
  const [resultsData, setResultsData] = useState<IResultsByPollId | null>(null);

  const [statisticsData, setStatisticsData] = useState<IStatisticResult | null>(
    null,
  );
  const [isShowPersonalResults, setIsShowPersonalResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { useGetResultbyId, useGetAllResultsByPollId, useGetStatisticResults } =
    useResult();
  const { useGetPoll } = usePoll();

  useGetAllResultsByPollId(pollId, setResultsData);
  const { isFetching } = useGetStatisticResults(pollId, setStatisticsData);
  const { refetch } = useGetResultbyId(chosenUsersResultId, setCurrentResult);
  const { data: pollData } = useGetPoll(pollId);

  useEffect(() => {
    if (!pollId) {
      setCurrentResult(null);
      setChosenUsersResultId(null);
      setResultsData(null);
    }
  }, [pollId]);

  useEffect(() => {
    if (resultsData && !chosenUsersResultId) {
      setChosenUsersResultId(resultsData.results[0]._id);
    }
  }, [resultsData, chosenUsersResultId]);

  useEffect(() => {
    if (!chosenUsersResultId) return;
    refetch();
  }, [chosenUsersResultId, refetch]);

  const handleClick = useCallback((arg: boolean) => {
    setIsShowPersonalResults(arg);
    setCurrentPage(0);
  }, []);

  const order = pollData?.data.poll.pages[currentPage].questions
    .map((q: IQuestion) => {
      if (
        q.type === QuestionType.ONE_ANSWER ||
        q.type === QuestionType.SEVERAL_ANSWERS
      ) {
        return { type: q.type, order: [q.first, q.second, q.third] };
      }
      return undefined;
    })
    .filter((q: IQuestion) => q);

  const results = resultsData?.results || null;

  setPageTitle(t('resutsPage.title'));

  return (
    <SidebarLayout>
      <TitleRow title={t('resutsPage.title')} />
      {pollId ? (
        <>
          {!isFetching ? (
            <>
              <ResultsSwitcher
                isShowPersonalResults={isShowPersonalResults}
                onClick={handleClick}
              />
              {isShowPersonalResults ? (
                <div className={styles.result__container}>
                  {currentResult && (
                    <div className={styles.result__header}>
                      <div className={styles.result__header_title}>
                        <span>Просмотр ответов:</span>
                        <span>{currentResult?.title}</span>
                      </div>
                      {`Вопросов: ${currentResult?.pages.reduce(
                        (sum: number, current: { [key: string]: IAnswer }) => {
                          return (
                            sum + Number(Object.keys(current.answers).length)
                          );
                        },
                        0,
                      )}, страниц: ${currentResult?.pages.length}`}
                    </div>
                  )}
                  <UserResults
                    currentPage={currentPage}
                    currentResult={currentResult}
                    results={results}
                    setChosenUsersResultId={setChosenUsersResultId}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              ) : (
                <StatisticResult
                  currentPage={currentPage}
                  order={order}
                  setCurrentPage={setCurrentPage}
                  statisticsData={statisticsData}
                />
              )}
            </>
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <Results />
      )}
    </SidebarLayout>
  );
};
export default ResultsPage;
