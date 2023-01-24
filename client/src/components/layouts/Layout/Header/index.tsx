import { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import { DropDown } from 'src/components/DropDown';
import { authRoutes } from 'src/consts';
import { AuthContext } from 'src/context/authContext';

import styles from './styles.module.scss';

export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { pollId } = useParams();
  const { pathname } = useLocation();

  const isPollPage = pathname.split('/').includes('polls');
  const handleCLick = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      {isAuthenticated ? (
        <>
          <div
            className={styles.logo}
            role="presentation"
            onClick={handleCLick}
          >
            {t('header.home')}
          </div>
          <div className={styles.navBar}>
            <div className={styles.languages}>
              <span className={styles.languages_text}>
                {t('header.language')}
              </span>
              <DropDown>
                <div
                  id="en"
                  role="presentation"
                  onClick={(e) => {
                    const element = e.currentTarget as HTMLInputElement;
                    i18n.changeLanguage(element.id);
                  }}
                >
                  En
                </div>
                <div
                  id="ru"
                  role="presentation"
                  onClick={(e) => {
                    const element = e.currentTarget as HTMLInputElement;
                    i18n.changeLanguage(element.id);
                  }}
                >
                  Ru
                </div>
              </DropDown>
            </div>
            <img
              alt=""
              className={styles.avatar}
              height="20"
              src="/assets/person.png"
              width="20"
            />
            <button
              className={styles.header__signout_btn}
              type="button"
              onClick={logout}
            >
              {t('header.signOut')}
            </button>
          </div>
        </>
      ) : (
        <Link
          to={
            isAuthenticated && isPollPage
              ? authRoutes.login
              : `${authRoutes.loginWithRedirect}/${pollId}`
          }
        >
          {t('header.logIn')}
        </Link>
      )}
    </div>
  );
}
