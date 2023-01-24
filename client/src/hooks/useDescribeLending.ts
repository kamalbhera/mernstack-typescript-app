import { useTranslation } from 'react-i18next';

export const useDescribeLending = () => {
  const { t } = useTranslation();
  const lending = (value: number) => {
    if (value === 1) {
      return t('statisticsPage.describe_v3');
    }
    if (value > 1 && value < 5) {
      return t('statisticsPage.describe_v2');
    }
    return t('statisticsPage.describe_v1');
  };
  return lending;
};
