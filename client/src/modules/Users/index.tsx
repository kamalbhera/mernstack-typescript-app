import { useEffect, useState } from 'react';

import { format } from 'date-fns-tz';
import { useTranslation } from 'react-i18next';

import { useUser } from 'src/api/user';
import SidebarLayout from 'src/components/layouts/SidebarLayout';
import { Spinner } from 'src/components/Spinner';
import { Table } from 'src/components/Table';
import { TableRow } from 'src/components/Table/TableRow';
import { TitleRow } from 'src/components/TitleRow';
import { PAGE_SKIP, PER_PAGE } from 'src/consts';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { IUser, IUsers } from 'src/types/User';

export const Users = () => {
  const { t } = useTranslation();
  useEffect(() => {
    setPageTitle(t('usersPage.title'));
  }, [t]);
  const [items, setItems] = useState<IUsers>({ users: [], totalItems: 0 });
  const [skip, setSkip] = useState(PAGE_SKIP);

  const { useGetUsers } = useUser();

  const { isLoading } = useGetUsers(
    {
      size: PER_PAGE,
      skip,
    },
    setItems,
  );

  const { users, totalItems } = items;

  return (
    <SidebarLayout>
      <TitleRow title={t('usersPage.title')} />
      {users.length && !isLoading ? (
        <Table
          setSkip={setSkip}
          skip={skip}
          titles={[
            t('usersPage.name'),
            t('usersPage.role'),
            t('usersPage.createdAt'),
            t('usersPage.polls'),
          ]}
          totalItems={totalItems}
        >
          {users?.map((user: IUser) => (
            <TableRow key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.isAdmin ? t('usersPage.admin') : t('usersPage.user')}
              </td>
              <td>{format(new Date(user.createdAt), 'MMM dd yyyy HH:mm')}</td>
              <td>{user.totalPolls || 0}</td>
            </TableRow>
          ))}
        </Table>
      ) : (
        <Spinner />
      )}
    </SidebarLayout>
  );
};
export default Users;
