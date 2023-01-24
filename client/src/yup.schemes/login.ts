import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useValidateLogin = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    email: Yup.string().required(t('form.warning.required')),
    password: Yup.string().required(t('form.warning.required')),
  });
};
