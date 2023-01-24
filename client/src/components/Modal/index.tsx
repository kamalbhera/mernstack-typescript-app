import { FC } from 'react';

import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';

interface ModalWindowProps {
  headline: string;
  hideModalHandler: () => void;
  isActiveModal: boolean;
  message: string;
  action: () => void;
}

export const Modal: FC<ModalWindowProps> = ({
  headline,
  hideModalHandler,
  isActiveModal,
  message,
  action,
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    hideModalHandler();
    action();
  };
  return createPortal(
    <div
      className={`${styles.substrate} ${
        isActiveModal && styles.substrate_active
      }`}
      role="presentation"
      onClick={hideModalHandler}
    >
      <div
        className={styles.modalWindow}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalWindow__header}>
          <h2>{headline}</h2>
        </div>
        <div className={styles.modalWindow__content}>
          <p className={styles.modalWindow__message}>{message}</p>
          <div className={styles['modalWindow__btn-container']}>
            <button
              className={`${styles.modalWindow__btn} ${styles['modalWindow__btn-cancel']}`}
              type="button"
              onClick={() => {
                hideModalHandler();
              }}
            >
              {t('form.button.cancelButton')}
            </button>
            <button
              className={`${styles.modalWindow__btn} ${styles['modalWindow__btn-cancel']}`}
              type="button"
              onClick={handleClick}
            >
              {t('form.button.ok')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};
