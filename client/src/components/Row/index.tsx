import { FC } from 'react';

import { multipleClasses } from 'src/helpers/multipleClasses';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}
export const Row: FC<Props> = ({ className, children }) => {
  return (
    <div className={multipleClasses(styles.row, className || '')}>
      {children}
    </div>
  );
};
