import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IAnswer } from 'src/types/Results';

import styles from './styles.module.scss';

interface Props {
  answer: IAnswer;
  totalResults: number;
}
export const ListResult: FC<Props> = ({ answer, totalResults }) => {
  const { t } = useTranslation();
  if (!answer) return null;
  const { title, totalAnswers } = answer;
  return (
    <div className={styles.result_wr}>
      <div className={styles.result_title}>{title}</div>
      <div className={styles.result_subtitle}>
        <span>
          {t('statisticsPage.answered')}:{totalAnswers}
        </span>
        <span>
          {t('statisticsPage.skipped')}: {totalResults - totalAnswers!}
        </span>
      </div>
      <div className={styles.result_main}>
        {Object.keys(answer.value).map((el: string, i: number) => {
          return (
            <blockquote
              key={`${el}${i.toString()}`}
              className={styles.result_blockqoute}
            >
              <p>{el}</p>
              <hr />
            </blockquote>
          );
        })}
      </div>
      <hr />
    </div>
  );
};
