import Layout from 'src/components/layouts/Layout';

import styles from './styles.module.scss';

export const Page404 = () => {
  return (
    <Layout>
      <section>
        <div className={styles.error}>
          <h1>404 error</h1>
          <h2>Page not found</h2>
        </div>
      </section>
    </Layout>
  );
};
