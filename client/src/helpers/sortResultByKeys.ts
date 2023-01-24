import { IAnswer, IPollResult } from 'src/types/Results';

export const sortResultByKeys = (result: IPollResult) => {
  return {
    ...result,
    pages: result?.pages.map(
      (page: { answers: { [k: string]: IAnswer }; title: string } | null) => {
        if (page) {
          return {
            ...page,
            answers: Object.fromEntries(
              Object.entries(page?.answers || {}).sort((a, b) => {
                return Number(a[0].split('_')[1]) - Number(b[0].split('_')[1]);
              }),
            ),
          };
        }
        return null;
      },
    ),
  };
};
