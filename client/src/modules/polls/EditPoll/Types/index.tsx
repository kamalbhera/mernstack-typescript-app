import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IQuestion, QuestionType } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  addType: (arg: IQuestion) => void;
  nextId: number;
  counts: {
    ONE_ANSWER: number;
    SEVERAL_ANSWERS: number;
    TEXT_ANSWER: number;
    RANGE_ANSWER: number;
    RATING_ANSWER: number;
  };
  currentPage: number;
}
export const Types: FC<Props> = ({ addType, nextId, counts, currentPage }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.typeBar}>
      <div className={styles.typeBar__title}>
        {t('editPollsPage.types.typesTitle')}
      </div>
      <div
        className={styles.typeBar__item}
        role="presentation"
        onClick={() =>
          addType({
            type: QuestionType.ONE_ANSWER,
            id: `${currentPage}/id_${nextId}`,
            title: `${t('editPollsPage.question.oneAnswer')} #${
              counts[QuestionType.ONE_ANSWER] + 1 || ''
            }`,
            first: 'Ответ 1',
            second: 'Ответ 2',
            third: 'Ответ 3',
            required: false,
          })
        }
      >
        {t('editPollsPage.types.answerOtionsOne')}
      </div>
      <div
        className={styles.typeBar__item}
        role="presentation"
        onClick={() =>
          addType({
            type: QuestionType.SEVERAL_ANSWERS,
            id: `${currentPage}/id_${nextId}`,
            title: `${t('editPollsPage.question.multipleAnswer')} #${
              counts[QuestionType.SEVERAL_ANSWERS] + 1 || ''
            }`,
            first: 'Ответ 1',
            second: 'Ответ 2',
            third: 'Ответ 3',
            required: false,
          })
        }
      >
        {t('editPollsPage.types.answerOtionsSeveral')}
      </div>
      <div
        className={styles.typeBar__item}
        role="presentation"
        onClick={() =>
          addType({
            type: QuestionType.TEXT_ANSWER,
            id: `${currentPage}/id_${nextId}`,
            title: `${t('editPollsPage.question.textAnswer')} #${
              counts[QuestionType.TEXT_ANSWER] + 1 || ''
            }`,
            text: 'Произвольный ответ',
            required: false,
          })
        }
      >
        {t('editPollsPage.types.answerText')}
      </div>
      <div
        className={styles.typeBar__item}
        role="presentation"
        onClick={() =>
          addType({
            type: QuestionType.RATING_ANSWER,
            id: `${currentPage}/id_${nextId}`,
            title: `${t('editPollsPage.question.ratingAnswer')} #${
              counts[QuestionType.RATING_ANSWER] + 1 || ''
            }`,
            value: 0,
            required: false,
          })
        }
      >
        {t('editPollsPage.types.answerRating')}
      </div>
      <div
        className={styles.typeBar__item}
        role="presentation"
        onClick={() =>
          addType({
            type: QuestionType.RANGE_ANSWER,
            id: `${currentPage}/id_${nextId}`,
            title: `${t('editPollsPage.question.rangeAnswer')} #${
              counts[QuestionType.RANGE_ANSWER] + 1 || ''
            }`,
            value: 0,
            required: false,
          })
        }
      >
        {t('editPollsPage.types.answerRange')}
      </div>
    </div>
  );
};
