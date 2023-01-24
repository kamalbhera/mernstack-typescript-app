import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  setSkip: (arg: ((prev: number) => number) | number) => void;
  skip: number;
  totalItems: number;
  perPage?: number;
}
const PER_PAGE = 5;

export const Pagination: FC<Props> = ({
  setSkip,
  skip,
  totalItems,
  perPage = PER_PAGE,
}) => {
  const Last = Math.floor(totalItems / perPage) * perPage;
  const isfirst = skip === 0;
  const isLast = skip + perPage >= totalItems;

  const previous = (prev: number) => {
    if (isfirst) return 0;
    return prev - perPage;
  };
  const next = (prev: number) => {
    if (skip === Last) return Last;
    if (skip + perPage === totalItems) return skip;
    return prev + perPage;
  };

  const last = () => {
    if (totalItems % perPage === 0) {
      return Last - perPage;
    }
    return Last;
  };

  return (
    <div className={styles.pagination}>
      <span
        className={isfirst ? styles.notAllowed : ''}
        role="presentation"
        onClick={() => setSkip(0)}
      >
        «
      </span>
      <span
        className={isfirst ? styles.notAllowed : styles.normal}
        role="presentation"
        onClick={() => setSkip((prev: number) => previous(prev))}
      >
        ‹
      </span>
      <span
        className={isLast ? styles.notAllowed : styles.normal}
        role="presentation"
        onClick={() => setSkip((prev: number) => next(prev))}
      >
        ›
      </span>
      <span
        className={isLast ? styles.notAllowed : styles.normal}
        role="presentation"
        onClick={() => setSkip(() => last())}
      >
        »
      </span>
    </div>
  );
};
