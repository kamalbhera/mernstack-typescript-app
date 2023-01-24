import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  completed: number;
}
const ProgressBar: FC<Props> = ({ currentPage, totalPages, completed }) => {
  return (
    <div className={styles.progressBar__wrapper}>
      <span>{`${currentPage}/${totalPages}`}</span>
      <div className={styles.progressBar__container}>
        <div
          className={styles.progressBar__filter}
          style={{ width: `${completed}%` }}
        >
          <span className={styles.progressBar__label} />
        </div>
      </div>
      <span>{`${completed}%`}</span>
    </div>
  );
};

export default ProgressBar;
