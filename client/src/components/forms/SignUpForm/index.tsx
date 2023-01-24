import { useState, useContext } from 'react';

import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { PATHS } from 'src/api';
import { routes } from 'src/consts';
import { AuthContext } from 'src/context/authContext';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { useRequest } from 'src/hooks/useRequest';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { useValidateSignUp } from 'src/yup.schemes/signup';

import styles from './style.module.scss';

const SignUpForm = () => {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const { request } = useRequest();
  const { login } = useContext(AuthContext);
  const { showError } = useShowNotification();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { pollId } = useParams();

  const showAndHidePasswordHandler = () =>
    passwordIsShown ? setPasswordIsShown(false) : setPasswordIsShown(true);

  const validationSchema = useValidateSignUp();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await request.post(PATHS.signup, {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        if (data.data) {
          login(data.data.tokens.accessToken, data.data.userId);
          return pollId ? navigate(`${routes.polls}/${pollId}`) : navigate('/');
        }
      } catch (e) {
        const error = e as AxiosError;
        showError(error?.response?.data.message.toString());
      }
    },
  });

  setPageTitle(t('signUp.title'));

  return (
    <div className={styles.form__container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.form__headline}>Sign up</h2>
        <div className={styles['form__input-wr']}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.form__input}
            id="name"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.name ? (
            <span className="error">{t('form.warning.required')}</span>
          ) : null}
        </div>
        <div className={styles['form__input-wr']}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.form__input}
            id="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="error">{t('form.warning.required')}</span>
          ) : null}
        </div>
        <div className={styles['form__input-wr']}>
          <label htmlFor="password">Password</label>
          <div className={styles.form__wr}>
            <input
              autoComplete="off"
              className={styles.form__input}
              id="password"
              name="password"
              type={passwordIsShown ? 'text' : 'password'}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <button
              className={`material-icons-outlined ${styles.form__eye}`}
              type="button"
              onClick={showAndHidePasswordHandler}
            >
              {passwordIsShown ? 'visibility_off' : 'visibility'}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{t('form.warning.required')}</span>
          ) : null}
        </div>
        <button className={styles['form__submit-btn']} type="submit">
          Submit
        </button>
        <Link className={styles.form__footerLine} to="/auth/login">
          Log in
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
