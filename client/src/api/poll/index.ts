import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'src/api';
import { pollsKeys } from 'src/api/poll/queryKeys';
import { useRequest } from 'src/hooks/useRequest';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { IPoll, IPolls } from 'src/types/Poll';

export const usePoll = () => {
  const { t } = useTranslation();
  const { request } = useRequest();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showMessage, showError } = useShowNotification();

  const useGetPoll = (pollId: string | null) => {
    return useQuery(
      pollsKeys.getPoll,
      () => request.get(`${PATHS.poll}/${pollId}`),
      {
        refetchOnWindowFocus: 'always',
        refetchOnMount: 'always',
        staleTime: 0,
        enabled: !!pollId,
        onError: (error: AxiosError) => {
          showError(error.toString());
        },
      },
    );
  };

  const useGetPolls = (
    {
      size,
      skip,
      userId,
    }: {
      size: number;
      skip: number;
      userId: string | null;
    },
    setItems: (data: IPolls) => void,
  ) => {
    return useQuery(
      pollsKeys.getPolls,
      () =>
        request.get(`${PATHS.poll}?userId=${userId}&skip=${skip}&size=${size}`),
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

  const useCreatePoll = () => {
    return useMutation(
      (values: { userId: string | null; poll: IPoll }) =>
        request.post(PATHS.poll, values),
      {
        onSuccess: () => {
          showMessage(t('editPollsPage.message.pollCreated'));
          navigate('/polls');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  const useUpdatePoll = (pollId: string | null) => {
    return useMutation(
      (values: { poll: IPoll }) =>
        request.put(`${PATHS.poll}/${pollId}`, values),
      {
        onSuccess: () => {
          showMessage(t('editPollsPage.message.pollUpdated'));
          navigate('/polls');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  const useDeletePoll = () => {
    return useMutation(
      async (pollId: string) => request.delete(`${PATHS.poll}/${pollId}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(pollsKeys.getPolls);
          showMessage(t('editPollsPage.message.pollDeleted'));
          navigate('/polls');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  return {
    useGetPoll,
    useGetPolls,
    useCreatePoll,
    useUpdatePoll,
    useDeletePoll,
  };
};
