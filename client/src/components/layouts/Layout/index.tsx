import { FC } from 'react';

import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.scss';

const Layout: FC = ({ children }) => {
  return (
    <div className={styles.layout__wrapper}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
