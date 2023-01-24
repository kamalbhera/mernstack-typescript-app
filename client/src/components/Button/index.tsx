import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { multipleClasses } from 'src/helpers/multipleClasses';

import styles from './styles.module.scss';

interface Props {
  path?: string;
  variant?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<Props> = ({
  path,
  variant,
  children,
  onClick,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path || '/');
  };

  return (
    <div
      className={multipleClasses(
        styles.button,
        styles[`${variant}`],
        className || '',
      )}
      role="presentation"
      onClick={onClick || handleClick}
    >
      {children}
    </div>
  );
};

export default Button;
