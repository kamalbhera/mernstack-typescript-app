import styles from './style.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.loader__wr}>
      <div className={styles.loader} />
    </div>
  );
};
