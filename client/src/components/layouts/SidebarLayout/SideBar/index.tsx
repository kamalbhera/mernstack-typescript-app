import { useTranslation } from 'react-i18next';

import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

export const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBar_btn_group}>
        <Button path="/polls" variant="big">
          {t('sidebar.myPolls')}
        </Button>
        <Button path="/templates" variant="big">
          {t('sidebar.templates')}
        </Button>
        <Button path="/results" variant="big">
          {t('sidebar.results')}
        </Button>
      </div>
      <Button path="/users" variant="big">
        {t('sidebar.users')}
      </Button>
    </div>
  );
};
