import { AxiosError } from 'axios';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'src/api';
import { resultsKeys } from 'src/api/result/queryKeys';
import { useRequest } from 'src/hooks/useRequest';
import { useShowNotification } from 'src/hooks/useShowNotification';
import {
  IAnswer,
  ICreateResult,
  IResultsByPollId,
  IStatisticResult,
  IStatisticSeparateResult,
} from 'src/types/Results';

export const useResult = () => {
  const { request } = useRequest();
  const navigate = useNavigate();
  const { showMessage, showError } = useShowNotification();

  const useGetResultbyId = (
    resultId: string | null,
    setCurrentResult: (data: IStatisticSeparateResult) => void,
  ) => {
    return useQuery(
      resultsKeys.getResult,
      () => request.get(`${PATHS.result}/id/${resultId}`),
      {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: !!resultId,
        onSuccess: ({ data }) => {
          const filtredResults = {
            ...data.results.result,
            pages: data.results.result.pages.filter(
              (res: { [key: string]: IAnswer }) => res !== null,
            ),
          };
          setCurrentResult(filtredResults);
        },
        onError: (error: AxiosError) => {
          showError(error.toString());
        },
      },
    );
  };
  const useGetAllResultsByPollId = (
    pollId: string | null,
    setResultsData: (data: IResultsByPollId) => void,
  ) => {
    return useQuery(
      resultsKeys.getResults,
      () => request.get(`${PATHS.result}/${pollId}`),
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!pollId,
        onSuccess: ({ data }) => {
          setResultsData(data);
        },
        onError: (error: AxiosError) => {
          showError(error.toString());
        },
      },
    );
  };
  const useGetStatisticResults = (
    pollId: string | null,
    setResultsData: (data: IStatisticResult) => void,
  ) => {
    return useQuery(
      resultsKeys.getStatisticResults,
      () => request.get(`${PATHS.statistic}/${pollId}`),
      {
        refetchOnWindowFocus: 'always',
        refetchOnMount: 'always',
        enabled: !!pollId,
        onSuccess: ({ data }) => {
          setResultsData(data);
        },
        onError: (error: AxiosError) => {
          showError(error.toString());
        },
      },
    );
  };

  const useCreateResult = () => {
    return useMutation(
      (values: ICreateResult) => request.post(PATHS.result, values),
      {
        onSuccess: () => {
          showMessage('Result was successfully saved');
          navigate('/polls');
        },
        onError: (error: AxiosError) => {
          showError(error?.response?.data.message.toString());
        },
      },
    );
  };

  return {
    useGetResultbyId,
    useGetAllResultsByPollId,
    useGetStatisticResults,
    useCreateResult,
  };
};
