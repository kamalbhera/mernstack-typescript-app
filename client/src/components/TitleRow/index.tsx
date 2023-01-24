import { FC } from 'react';

import Button from 'src/components/Button';
import { Row } from 'src/components/Row';

import styles from './styles.module.scss';

interface Props {
  title: string;
  buttonTitle?: string;
  onClick?: () => void;
}
export const TitleRow: FC<Props> = ({ title, buttonTitle, onClick }) => {
  return (
    <Row className={styles.titleRow}>
      <div className={styles.titleRow__title}>{title}</div>
      {buttonTitle && (
        <Button variant="small" onClick={onClick}>
          {buttonTitle}
        </Button>
      )}
    </Row>
  );
};
