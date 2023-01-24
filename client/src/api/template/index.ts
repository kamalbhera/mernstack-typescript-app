import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'src/api';
import { templateKeys } from 'src/api/template/queryKeys';
import { useRequest } from 'src/hooks/useRequest';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { ICreateTemplate, ITemplates } from 'src/types/Templates';

export const useTemplate = () => {
  const { t } = useTranslation();
  const { request } = useRequest();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showMessage, showError } = useShowNotification();

  const useGetTemplate = (templateId: string | null) => {
    return useQuery(
      templateKeys.getTemplate,
      () => request.get(`${PATHS.template}/${templateId}`),
      {
        refetchOnWindowFocus: 'always',
        refetchOnMount: 'always',
        enabled: !!templateId,
        onError: (error: AxiosError) => {
          showError(error.toString());
        },
      },
    );
  };
  const useGetTemplates = (
    { size, skip }: { size: number; skip: number },
    setItems: (data: ITemplates) => void,
  ) => {
    return useQuery(
      templateKeys.getTemplates,
      () => request.get(`${PATHS.template}?skip=${skip}&size=${size}`),
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

  const useCreateTemplate = () => {
    return useMutation(
      (values: { poll: ICreateTemplate }) =>
        request.post(PATHS.template, values),
      {
        onSuccess: () => {
          showMessage(t('editPollsPage.message.templateCreated'));
          navigate('/templates');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  const useUpdateTemplate = (templateId: string | null) => {
    return useMutation(
      (values: { template: ICreateTemplate }) =>
        request.put(`${PATHS.template}/${templateId}`, values),
      {
        onSuccess: () => {
          showMessage(t('editPollsPage.message.templateUpdated'));
          navigate('/templates');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  const useDeleteTemplate = () => {
    return useMutation(
      async (templateId: string) =>
        request.delete(`${PATHS.template}/${templateId}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(templateKeys.getTemplates);
          showMessage(t('editPollsPage.message.templateDeleted'));
          navigate('/templates');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  return {
    useGetTemplate,
    useGetTemplates,
    useCreateTemplate,
    useUpdateTemplate,
    useDeleteTemplate,
  };
};
