import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { PATHS } from 'src/api';
import { userKeys } from 'src/api/user/queryKeys';
import { useRequest } from 'src/hooks/useRequest';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { IUsers } from 'src/types/User';

export const useUser = () => {
  const { request } = useRequest();
  const { showError } = useShowNotification();

  const useGetUsers = (
    { size, skip }: { size: number; skip: number },
    setItems: (arg: IUsers) => void,
  ) => {
    return useQuery(
      userKeys.getUsers,
      () => request.get(`${PATHS.user}?skip=${skip}&size=${size}`),
      {
        refetchOnWindowFocus: 'always',
        refetchOnMount: 'always',
        onSuccess: ({ data }) => {
          setItems(data);
        },
        onError: (error: AxiosError) => {
          showError(error.toString());
        },
      },
    );
  };

  return {
    useGetUsers,
  };
};
