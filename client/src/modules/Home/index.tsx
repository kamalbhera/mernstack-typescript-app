import {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';

import Layout from 'src/components/layouts/Layout';
import { routes } from 'src/consts/';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { HomePageBlock } from 'src/modules/Home/HomePageBlock';
import { BlockIcon } from 'src/modules/Home/HomePageBlockIcon';

import styles from './styles.module.scss';

export const Home: FC = () => {
  const [currentBlock, setCurrentBlock] = useState<ReactNode | null>(null);
  const mouseCoords = useRef<{ x: number; y: number } | null>(null);
  const { t } = useTranslation();

  const startRotate = useCallback(() => {
    const halfHeight = (currentBlock as HTMLElement).offsetHeight / 2;
    const halfWidth = (currentBlock as HTMLElement).offsetWidth / 2;
    (currentBlock as HTMLElement).style.transform = `rotateX(${
      -(mouseCoords.current!.y - halfHeight) / 10
    }deg) rotateY(${(mouseCoords.current!.x - halfWidth) / 10}deg)`;
  }, [currentBlock]);

  const stopRotate = useCallback(() => {
    (currentBlock as HTMLElement).style.transform = 'rotate(0)';
  }, [currentBlock]);

  const handleMouseMove = useCallback((e) => {
    mouseCoords.current = { x: e.offsetX, y: e.offsetY };
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });

  useEffect(() => {
    if (currentBlock) {
      (currentBlock as HTMLElement).addEventListener('mousemove', startRotate);
      (currentBlock as HTMLElement).addEventListener('mouseout', stopRotate);
      return () => {
        (currentBlock as HTMLElement).addEventListener('mousemove', stopRotate);
        (currentBlock as HTMLElement).addEventListener('mouseout', stopRotate);
      };
    }
  }, [currentBlock, startRotate, stopRotate]);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    setCurrentBlock(e.target);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setCurrentBlock(null);
  }, []);

  setPageTitle(t('homePage.title'));

  return (
    <Layout>
      <div className={styles.hpContainer}>
        <main className={styles.hpContainer__main}>
          <div className={styles.inner}>
            {Object.values(routes).map((route: string) => (
              <HomePageBlock
                key={route}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                to={route}
              >
                <BlockIcon route={route} />
              </HomePageBlock>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
