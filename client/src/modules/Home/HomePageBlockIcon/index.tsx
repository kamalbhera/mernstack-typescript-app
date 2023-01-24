import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import AddPollIcon from 'src/assets/icons/AddPollIcon';
import AddTemplateIcon from 'src/assets/icons/AddTemplateIcon';
import PollListIcon from 'src/assets/icons/PollListIcon';
import ResultsListIcon from 'src/assets/icons/ResultsListIcon';
import TemplateListIcon from 'src/assets/icons/TemplateListIcon';
import UserListIcon from 'src/assets/icons/UserListIcon';
import { routes } from 'src/consts';

import styles from './styles.module.scss';

export const BlockIcon: FC<{ route: string }> = ({ route }) => {
  const { t } = useTranslation();
  if (route === routes.addPoll) {
    return (
      <>
        <AddPollIcon className={styles.blockIcon} />
        <span>{t('homePage.navCard.addPoll')}</span>
      </>
    );
  }
  if (route === routes.polls) {
    return (
      <>
        <PollListIcon className={styles.blockIcon} />
        <span>{t('homePage.navCard.polls')}</span>
      </>
    );
  }
  if (route === routes.addTemplate) {
    return (
      <>
        <AddTemplateIcon className={styles.blockIcon} />
        <span>{t('homePage.navCard.addTemplate')}</span>
      </>
    );
  }
  if (route === routes.templates) {
    return (
      <>
        <TemplateListIcon className={styles.blockIcon} />
        <span>{t('homePage.navCard.templates')}</span>
      </>
    );
  }
  if (route === routes.users) {
    return (
      <>
        <UserListIcon className={styles.blockIcon} />
        <span>{t('homePage.navCard.users')}</span>
      </>
    );
  }
  if (route === routes.results) {
    return (
      <>
        <ResultsListIcon className={styles.blockIcon} />
        <span>{t('homePage.navCard.results')}</span>
      </>
    );
  }
  return null;
};
