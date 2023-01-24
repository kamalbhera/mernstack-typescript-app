import { useState, useContext } from 'react';

import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { PATHS } from 'src/api';
import { routes, authRoutes } from 'src/consts';
import { AuthContext } from 'src/context/authContext';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { useRequest } from 'src/hooks/useRequest';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { useValidateLogin } from 'src/yup.schemes/login';

import styles from './style.module.scss';

const LogInForm = () => {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const { request } = useRequest();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showError } = useShowNotification();
  const { t } = useTranslation();

  const { pollId } = useParams();

  const showAndHidePasswordHandler = () =>
    passwordIsShown ? setPasswordIsShown(false) : setPasswordIsShown(true);

  const validationSchema = useValidateLogin();

  // useEffect(() => {
  //   document.cookie =
  //     'accessToken=;max-age=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  //   document.cookie =
  //     'userId=;max-age=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  // });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await request.post(PATHS.login, {
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        });
        if (data) {
          login(data.data.tokens.accessToken, data.data.userId);
          return pollId ? navigate(`${routes.polls}/${pollId}`) : navigate('/');
        }
      } catch (e) {
        const error = e as AxiosError;
        showError(error?.response?.data.message.toString());
      }
    },
  });

  setPageTitle(t('logIn.title'));

  return (
    <div className={styles.form__container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.form__headline}>Log in</h2>
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
            <span className="error">{formik.errors.email}</span>
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
          {formik.touched.email && formik.errors.email ? (
            <span className="error">{t('form.warning.required')}</span>
          ) : null}
        </div>
        {/* <div
          className={`${styles['form__input-wr']} ${styles['form__input-wr_row']}`}
        >
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            onChange={formik.handleChange}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div> */}
        <button className={styles['form__submit-btn']} type="submit">
          Submit
        </button>
        <Link
          className={styles.form__footerLine}
          to={
            pollId
              ? `${authRoutes.signupWithRedirect}/${pollId}`
              : authRoutes.signup
          }
        >
          Sign up
        </Link>
      </form>
    </div>
  );
};

export default LogInForm;
