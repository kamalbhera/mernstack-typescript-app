import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Pagination } from 'src/components/Pagination';
import { PER_PAGE } from 'src/consts';
import { separator } from 'src/helpers/separator';

import styles from './styles.module.scss';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface Props {
  titles: string[];
  totalItems: number;
  skip: number;
  setSkip: (arg: ((prev: number) => number) | number) => void;
}
export const Table: FC<Props> = ({
  titles,
  totalItems,
  skip,
  children,
  setSkip,
}) => {
  const { t } = useTranslation();
  const tableSize = {
    gridTemplateColumns: `repeat(${titles.length}, 1fr)`,
  };
  const currentPage = skip / PER_PAGE + 1;
  const totalPages = Math.ceil(totalItems / PER_PAGE);

  return (
    <div className={styles.table__wrapper}>
      <table className={styles.table} style={tableSize}>
        <TableHeader className={styles.table__header}>
          <TableRow>
            {titles.map((title: string) => (
              <th key={title}>{title}</th>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>{children}</tbody>
      </table>
      <div className={styles.table__footer}>
        {separator(
          t('table.total', {
            totalItems,
          }),
          t('table.page', {
            pageNumber: currentPage,
            totalPages,
          }),
        )}
        <Pagination setSkip={setSkip} skip={skip} totalItems={totalItems} />
      </div>
    </div>
  );
};
