import { useEffect, useState, useContext, FormEventHandler } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { usePoll } from 'src/api/poll';
import { useResult } from 'src/api/result';
import Button from 'src/components/Button';
import Layout from 'src/components/layouts/Layout';
import { PollQuestion } from 'src/components/PollQuestion';
import ProgressBar from 'src/components/ProgressBar';
import { Spinner } from 'src/components/Spinner';
import { AuthContext, UserContext } from 'src/context/authContext';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { sortResultByKeys } from 'src/helpers/sortResultByKeys';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { IPoll } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';
import { IAnswer, IPollResult } from 'src/types/Results';

import styles from './styles.module.scss';

export const Poll = () => {
  const { t } = useTranslation();
  const [poll, setPoll] = useState<IPoll | null>(null);
  const { pollId = null } = useParams<string>();
  const [currentPage, setCurrentPage] = useState(0);
  const [result, setResult] = useState<IPollResult>({
    pages: [],
    title: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { showWarning } = useShowNotification();
  const { userId } = useContext<UserContext>(AuthContext);

  const { useGetPoll } = usePoll();
  const { useCreateResult } = useResult();
  const { data: pollData, isFetching } = useGetPoll(pollId);
  const { mutate: createResult } = useCreateResult();

  useEffect(() => {
    if (pollId && pollData) {
      setPoll(pollData?.data.poll);
    }
  }, [pollId, pollData]);

  if (!poll) return null;

  const requiredId = poll?.pages
    .map((arg: { title: string; questions: IQuestion[] }) =>
      arg.questions
        .filter((q: IQuestion) => q.required)
        .map((q: IQuestion) => q.id),
    )
    .flat();
  const chosenResult = result.pages
    .map(
      (page: { answers: { [key: string]: IAnswer }; title: string } | null) =>
        Object.keys(page?.answers || []),
    )
    .flat();

  const saveResult = () => {
    const isMissedRequired = requiredId
      ?.map((id: string) => chosenResult.includes(id))
      .includes(false);

    setIsSubmitting(isMissedRequired);
    if (isMissedRequired) {
      showWarning(t('pollPage.message.notEmptyRequiredFields'));
      return;
    }
    if (!result.pages.length) {
      showWarning(t('pollPage.message.notEmptyResultPage'));
      return;
    }
    createResult({
      pollId: pollId || null,
      userId: userId || null,
      result: sortResultByKeys(result),
      params: poll?.params,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handlePrev = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage === poll?.pages.length - 1) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const isDisabledPrevButton = currentPage === 0;
  const isDisabledNextPage = poll?.pages.length - 1 === currentPage;

  setPageTitle(t('pollPage.title'));

  return (
    <Layout>
      <>
        {!isFetching ? (
          <>
            <div className={styles.poll__wrapper}>
              <form onSubmit={handleSubmit}>
                <div className={styles.poll__title}>{poll?.title}</div>
                <div className={styles.poll__container}>
                  <div className={styles.poll__question_title}>
                    {poll?.params.showPageNumbers &&
                      poll?.pages[currentPage].title}
                  </div>
                  {poll?.pages?.[currentPage].questions?.map(
                    (question: IQuestion, i: number) => (
                      <PollQuestion
                        key={question.id}
                        chosenResult={chosenResult}
                        currentPage={currentPage}
                        i={i}
                        isSubmitting={isSubmitting}
                        poll={poll}
                        question={question}
                        requiredId={requiredId}
                        result={result}
                        setResult={setResult}
                      />
                    ),
                  )}
                </div>
              </form>
            </div>
            {poll?.params.showProgressBar && (
              <ProgressBar
                completed={Math.floor(
                  ((currentPage + 1) / poll?.pages.length) * 100,
                )}
                currentPage={currentPage + 1}
                totalPages={poll?.pages.length}
              />
            )}
            <div className={styles.poll__button_group}>
              <Button
                className={isDisabledPrevButton ? styles.disabled : ''}
                variant="small"
                onClick={handlePrev}
              >
                {t('pollPage.prevPage')}
              </Button>
              <Button
                className={isDisabledNextPage ? styles.disabled : ''}
                variant="small"
                onClick={handleNext}
              >
                {t('pollPage.nextPage')}
              </Button>
              <Button variant="small" onClick={saveResult}>
                {t('pollPage.saveResult')}
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.poll__wrapper}>
            <Spinner />
          </div>
        )}
      </>
    </Layout>
  );
};
export default Poll;
