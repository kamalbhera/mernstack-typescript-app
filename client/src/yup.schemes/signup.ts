import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useValidateSignUp = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    name: Yup.string().required(t('form.warning.required')),
    email: Yup.string().required(t('form.warning.required')),
    password: Yup.string().required(t('form.warning.required')),
  });
};
