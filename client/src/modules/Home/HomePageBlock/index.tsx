import { FC, MouseEventHandler } from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface Props {
  handleMouseEnter: MouseEventHandler<HTMLAnchorElement>;
  handleMouseLeave: () => void;
  to: string;
}
export const HomePageBlock: FC<Props> = ({
  handleMouseEnter,
  handleMouseLeave,
  children,
  to,
}) => {
  return (
    <Link
      className={styles.block}
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};
