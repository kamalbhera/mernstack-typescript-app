import { func } from './testHelper';

export const statistcTransform = (data: any) => {
  const totalResults = data.length;
  const title = data[0].result.title;
  const skipedPageTitle = 'skiped page';
  const newData = data
    .map((res) =>
      res.result.pages.map((page) =>
        page === null ? { title: skipedPageTitle, answers: {} } : page,
      ),
    )
    .reduce((el, val) => {
      const length = val.length;
      for (let i = 0; i < length; i++) {
        if (el.length < length) {
          el.push([]);
        }
        el[i].push(val[i]);
      }
      return el;
    }, [])
    .map((val) => {
      const page = val.filter((answer) => answer.title !== skipedPageTitle)[0]
        ?.title;
      const newVal = val.map((el) => {
        if (Object.keys(el.answers).length === 0 && val.length > 1) {
          return { ...el, title: page.title, createdBy: page.createdBy };
        } else {
          return el;
        }
      });
      return newVal;
    })
    .map((val) => {
      return val.reduce(
        (acc, val, _, arr) => {
          acc.title = arr[0].title;
          acc.createdBy = val.createdBy;
          if (val) {
            const currentPageAnswers = Object.values(val.answers);
            acc.answers.push(currentPageAnswers);
          }
          return acc;
        },
        { answers: [] },
      );
    })
    .map((val) => {
      const res = val.answers.reduce((acc, val) => {
        val.forEach((el) => {
          acc.push({ type: el.type, title: el.title, value: el.value });
        });
        return acc;
      }, []);

      return { ...val, answers: func(res) };
    });
  return {
    totalResults,
    title,
    pages: newData.filter(
      (el) => el.answers.length && title !== skipedPageTitle,
    ),
  };
};
