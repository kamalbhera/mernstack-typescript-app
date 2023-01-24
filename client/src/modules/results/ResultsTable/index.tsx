import { useEffect, useState, useContext } from 'react';

import { format } from 'date-fns-tz';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { usePoll } from 'src/api/poll';
import { EmptyResult } from 'src/components/EmptyResult';
import { Spinner } from 'src/components/Spinner';
import { Table } from 'src/components/Table';
import { TableRow } from 'src/components/Table/TableRow';
import { PAGE_SKIP, PER_PAGE } from 'src/consts';
import { AuthContext, UserContext } from 'src/context/authContext';
import { IPolls, IResultPoll } from 'src/types/Poll';


import styles from './styles.module.scss';

export const Results = () => {
  const { userId = null } = useContext<UserContext>(AuthContext);
  const [items, setItems] = useState<IPolls>({
    polls: [],
    totalItems: 0,
    totalResults: 0,
  });
  const [skip, setSkip] = useState<number>(PAGE_SKIP);
  const { t } = useTranslation();
  const { useGetPolls } = usePoll();

  const { refetch, isFetching } = useGetPolls(
    {
      size: PER_PAGE,
      skip,
      userId,
    },
    setItems,
  );

  useEffect(() => {
    refetch();
  }, [skip, refetch]);

  const { polls, totalResults } = items;

  const results = polls?.filter((poll: IResultPoll) => !!poll.totalResults);

  return (
    <>
      {results?.length ? (
        <Table
          setSkip={setSkip}
          skip={skip}
          titles={[
            t('resutsPage.name'),
            t('resutsPage.createdAt'),
            t('resutsPage.answers'),
            t('resutsPage.results'),
          ]}
          totalItems={totalResults}
        >
          {results?.map((item: IResultPoll) => (
            <TableRow key={item._id} className={styles.results__tr}>
              <td>{item.poll.title}</td>
              <td>{format(new Date(item.updatedAt), 'MMM dd yyyy HH:mm')}</td>
              <td>{item.totalResults}</td>
              <td className={styles.results__tr_link}>
                <Link to={`/results/${item._id}`}>
                  {t('resutsPage.linkLabel')}
                </Link>
              </td>
            </TableRow>
          ))}
        </Table>
      ) : null}
      {!polls.length && isFetching && <Spinner />}
      {!results.length && !isFetching && (
        <EmptyResult text={t('resutsPage.noResults')} />
      )}
    </>
  );
};
export default Results;
