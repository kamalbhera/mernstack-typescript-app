import { useTranslation } from 'react-i18next';

import { linkedinUrl } from 'src/consts';

import styles from './styles.module.scss';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className={styles.footer}>
      {t('footer.madeBy')}
      <a href={linkedinUrl}>
        <span>{'Fediukov Sergei'.toLocaleUpperCase()}</span>
      </a>
      2021
    </div>
  );
}
