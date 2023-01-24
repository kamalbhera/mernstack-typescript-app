import { FC } from 'react';

import Layout from 'src/components/layouts/Layout';

import { Sidebar } from './SideBar';
import styles from './styles.module.scss';

const SidebarLayout: FC = ({ children }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.container__main}>{children}</main>
      </div>
    </Layout>
  );
};

export default SidebarLayout;
