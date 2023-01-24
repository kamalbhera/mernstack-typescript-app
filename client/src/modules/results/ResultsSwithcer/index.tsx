import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { multipleClasses } from 'src/helpers/multipleClasses';

import styles from './styles.module.scss';

interface Props {
  isShowPersonalResults: boolean;
  onClick: (value: boolean) => void;
}

const ResultsSwitcher: FC<Props> = ({ isShowPersonalResults, onClick }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.result__switch_group}>
      <div
        className={multipleClasses(
          styles.result__switch_item,
          !isShowPersonalResults ? styles.result__switch_item_active : '',
        )}
        role="presentation"
        onClick={() => onClick(false)}
      >
        {t('statisticsPage.summary')}
      </div>
      <div
        className={multipleClasses(
          styles.result__switch_item,
          isShowPersonalResults ? styles.result__switch_item_active : '',
        )}
        role="presentation"
        onClick={() => onClick(true)}
      >
        {t('statisticsPage.separate')}
      </div>
    </div>
  );
};

export default ResultsSwitcher;
