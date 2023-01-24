import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IPoll } from 'src/types/Poll';

import styles from './styles.module.scss';

interface Props {
  addParam: (param: { [key: string]: boolean }) => void;
  poll: IPoll;
}

export const Params: FC<Props> = ({ addParam, poll }) => {
  const { t } = useTranslation();
  const {
    isAnonymous,
    isRandomOrder,
    showPageNumbers,
    showProgressBar,
    showQuestionNumbers,
    showRequired,
  } = poll?.params;

  return (
    <div className={styles.paramBar}>
      <div className={styles.paramBar__title}>
        {t('editPollsPage.params.paramsTitle')}
      </div>
      <label>
        <div className={styles.paramBar__item}>
          <input
            checked={isAnonymous}
            type="checkbox"
            onChange={() =>
              addParam({
                isAnonymous: !isAnonymous,
              })
            }
          />
          <span> {t('editPollsPage.params.anonimous')}</span>
        </div>
      </label>
      <label>
        <div className={styles.paramBar__item}>
          <input
            checked={showQuestionNumbers}
            type="checkbox"
            onChange={() =>
              addParam({
                showQuestionNumbers: !showQuestionNumbers,
              })
            }
          />
          <span>{t('editPollsPage.params.questionNumbers')}</span>
        </div>
      </label>
      <label>
        <div className={styles.paramBar__item}>
          <input
            checked={showPageNumbers}
            type="checkbox"
            onChange={() =>
              addParam({
                showPageNumbers: !showPageNumbers,
              })
            }
          />
          <span>{t('editPollsPage.params.pageTitles')}</span>
        </div>
      </label>
      <label>
        <div className={styles.paramBar__item}>
          <input
            checked={isRandomOrder}
            type="checkbox"
            onChange={() =>
              addParam({
                isRandomOrder: !isRandomOrder,
              })
            }
          />
          <span>{t('editPollsPage.params.randomQuestionsOrder')}</span>
        </div>
      </label>
      <label>
        <div className={styles.paramBar__item}>
          <input
            checked={showRequired}
            type="checkbox"
            onChange={() =>
              addParam({
                showRequired: !showRequired,
              })
            }
          />
          <span>{t('editPollsPage.params.requiredFielddMarks')}</span>
        </div>
      </label>
      <label>
        <div className={styles.paramBar__item}>
          <input
            checked={showProgressBar}
            type="checkbox"
            onChange={() =>
              addParam({
                showProgressBar: !showProgressBar,
              })
            }
          />
          <span>{t('editPollsPage.params.progressIndicator')}</span>
        </div>
      </label>
    </div>
  );
};
