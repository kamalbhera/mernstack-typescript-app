import { useState, useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';

import { usePoll } from 'src/api/poll';
import { useTemplate } from 'src/api/template';
import SidebarLayout from 'src/components/layouts/SidebarLayout';
import { Spinner } from 'src/components/Spinner';
import { initialPoll } from 'src/consts';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { IPoll } from 'src/types/Poll';
import { IQuestion, QuestionType } from 'src/types/Question';

import { Params } from './Params';
import { PollSchema } from './PollSchema';
import styles from './styles.module.scss';
import { Types } from './Types';

export const EditPoll = () => {
  const { pollId = null, templateId = null } = useParams<string>();
  const path = useLocation().pathname;
  const pathVar = useMemo(() => path.split('/').filter(Boolean)[0], [path]);
  const isTemplateCreation = path.indexOf('template') > 0;

  const { useGetPoll } = usePoll();
  const { useGetTemplate } = useTemplate();
  const { t } = useTranslation();

  const initialState = useMemo(
    () => ({
      ...initialPoll,
      title: `${t('editPollsPage.pollTitleValue.0')} ${
        isTemplateCreation
          ? t('editPollsPage.pollTitleValue.2')
          : t('editPollsPage.pollTitleValue.1')
      }`,
      pages: [{ title: `${t('editPollsPage.page')} 1`, questions: [] }],
    }),
    [isTemplateCreation, t],
  );
  const [poll, setPoll] = useState<IPoll>(initialState);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: pollData, isFetching: isPollFetching } = useGetPoll(pollId);
  const { data: templateData, isFetching: isTemplateFetching } =
    useGetTemplate(templateId);

  useEffect(() => {
    if (pollId && pollData) {
      setPoll(pollData?.data.poll);
    }
    if (templateId && templateData) {
      setPoll(templateData?.data.template);
    }
    return () => {
      setCurrentPage(0);
    };
  }, [pollId, templateId, pollData, templateData, initialState]);

  const addQuestion = (question: IQuestion) => {
    setPoll((prev: IPoll) => {
      return {
        ...prev,
        pages: prev.pages.map(
          (item: { title: string; questions: IQuestion[] }, i: number) =>
            currentPage === i
              ? { ...item, questions: [...item.questions, question] }
              : item,
        ),
      };
    });
  };
  const addParam = (param: { [key: string]: boolean }) => {
    setPoll((prev: IPoll) => {
      return {
        ...prev,
        params: { ...prev.params, ...param },
      };
    });
  };
  const nextId = Number(poll.pages[currentPage].questions.length) + 1;
  const { questions } = poll.pages[currentPage];
  const counts = {
    ONE_ANSWER: questions.filter(
      (el: IQuestion) => el.type === QuestionType.ONE_ANSWER,
    ).length,
    SEVERAL_ANSWERS: questions.filter(
      (el: IQuestion) => el.type === QuestionType.SEVERAL_ANSWERS,
    ).length,
    TEXT_ANSWER: questions.filter(
      (el: IQuestion) => el.type === QuestionType.TEXT_ANSWER,
    ).length,
    RANGE_ANSWER: questions.filter(
      (el: IQuestion) => el.type === QuestionType.RANGE_ANSWER,
    ).length,
    RATING_ANSWER: questions.filter(
      (el: IQuestion) => el.type === QuestionType.RATING_ANSWER,
    ).length,
  };

  if (pollId || templateId) {
    setPageTitle(t(`editPollsPage.${pathVar}Edit`));
  } else {
    setPageTitle(t(`editPollsPage.${pathVar}Create`));
  }

  return (
    <SidebarLayout>
      {!isPollFetching && !isTemplateFetching ? (
        <div className={styles.editPoll__wrapper}>
          <div className={styles.editPoll__container}>
            <PollSchema
              currentPage={currentPage}
              initialState={initialState}
              poll={poll}
              setCurrentPage={setCurrentPage}
              setPoll={setPoll}
            />
          </div>
          <div className={styles.editPoll__barWrapper}>
            <Types
              addType={addQuestion}
              counts={counts}
              currentPage={currentPage}
              nextId={nextId}
            />
            <Params addParam={addParam} poll={poll} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </SidebarLayout>
  );
};

export default EditPoll;
