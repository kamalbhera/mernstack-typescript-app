import { useEffect, useState, useContext, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { usePoll } from 'src/api/poll';
import { EmptyResult } from 'src/components/EmptyResult';
import GeneralLayout from 'src/components/layouts/SidebarLayout';
import { Spinner } from 'src/components/Spinner';
import { Table } from 'src/components/Table';
import { TitleRow } from 'src/components/TitleRow';
import { PAGE_SKIP, PER_PAGE } from 'src/consts';
import { AuthContext, UserContext } from 'src/context/authContext';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { PollRow } from 'src/modules/polls/Polls/PollItem';
import { IPoll, IPolls } from 'src/types/Poll';

export const Polls = () => {
  const { userId = null } = useContext<UserContext>(AuthContext);
  const [items, setItems] = useState<IPolls>({
    polls: [],
    totalItems: 0,
    totalResults: 0,
  });
  const [skip, setSkip] = useState<number>(PAGE_SKIP);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { useGetPolls, useDeletePoll } = usePoll();

  const { refetch, isFetching } = useGetPolls(
    {
      size: PER_PAGE,
      skip,
      userId,
    },
    setItems,
  );

  const { mutate: deletePoll } = useDeletePoll();

  useEffect(() => {
    refetch();
  }, [skip, refetch]);

  const { polls, totalItems } = items;

  const handleDeletePoll = useCallback(
    (pollId: string) => {
      if (polls.length === 1 && skip > 0) {
        deletePoll(pollId);
        setSkip(skip - PER_PAGE);
      } else {
        deletePoll(pollId);
      }
    },
    [deletePoll, polls, skip],
  );

  const handleNewPoll = useCallback(() => {
    navigate('/polls/new');
  }, [navigate]);

  setPageTitle(t('pollsPage.title'));
  return (
    <GeneralLayout>
      <TitleRow
        buttonTitle={t('pollsPage.newPoll')}
        title={t('pollsPage.title')}
        onClick={handleNewPoll}
      />
      <>
        {polls.length ? (
          <Table
            setSkip={setSkip}
            skip={skip}
            titles={[
              t('pollsPage.name'),
              t('pollsPage.createdAt'),
              t('pollsPage.answers'),
              t('pollsPage.link'),
              t('pollsPage.actions'),
            ]}
            totalItems={totalItems}
          >
            {polls?.map(
              (item: {
                poll: IPoll;
                _id: string;
                updatedAt: string;
                totalResults: number;
              }) => (
                <PollRow key={item._id} action={handleDeletePoll} item={item} />
              ),
            )}
          </Table>
        ) : null}
        {!polls.length && isFetching && <Spinner />}
        {!polls.length && !isFetching && (
          <EmptyResult text={t('pollsPage.noResults')} />
        )}
      </>
    </GeneralLayout>
  );
};
export default Polls;
