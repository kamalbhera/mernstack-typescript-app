import { ChangeEvent, FC } from 'react';

import CheckBoxGroup from 'src/components/Options/CheckBoxGroup';
import RadioGroup from 'src/components/Options/RadioGroup';
import RangeAnswer from 'src/components/Options/Range';
import RatingAnswer from 'src/components/Options/Rating';
import TextAnswer from 'src/components/Options/Text';
import { IPoll } from 'src/types/Poll';
import { IQuestion, QuestionType } from 'src/types/Question';
import { IAnswer, IPollResult } from 'src/types/Results';

import styles from './styles.module.scss';

interface Props {
  poll?: IPoll;
  question: IQuestion;
  i: number;
  result: IPollResult;
  setResult?: (arg: any) => void;
  requiredId?: string[];
  currentPage: number;
  chosenResult?: string[];
  isSubmitting?: boolean;
  isResultPage?: boolean;
}

export const PollQuestion: FC<Props> = ({
  i,
  poll,
  result,
  question,
  setResult,
  requiredId,
  currentPage,
  isSubmitting,
  chosenResult,
  isResultPage,
}) => {
  if (!poll) return null;
  const handleRadioGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPages = [...result.pages];
    newPages[currentPage] = {
      title: poll?.pages[currentPage].title,
      answers: {
        ...newPages[currentPage]?.answers,
        [e.target.id]: {
          value: e.target.value,
          title: e.target.name.split('/')[1],
          type: QuestionType.ONE_ANSWER,
          first: poll?.pages[currentPage].questions.filter(
            (q: IQuestion) => q.id === e.target.id,
          )[0].first,
          second: poll?.pages[currentPage].questions.filter(
            (q: IQuestion) => q.id === e.target.id,
          )[0].second,
          third: poll?.pages[currentPage].questions.filter(
            (q: IQuestion) => q.id === e.target.id,
          )[0].third,
        },
      },
    };
    setResult!((prev: IPollResult) => ({
      ...prev,
      pages: newPages,
      title: poll?.title,
    }));
  };

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPages = [...result.pages];
    if (e.target.checked) {
      if (newPages[currentPage]?.answers?.[e.target.id]) {
        newPages[currentPage] = {
          title: poll?.pages[currentPage].title,
          answers: {
            ...newPages[currentPage]?.answers,
            [e.target.id]: {
              ...newPages[currentPage]?.answers[e.target.id]!,
              value: [
                ...(newPages[currentPage]?.answers[e.target.id]
                  .value as string[]),
                e.target.value,
              ],
            },
          },
        };
        setResult!((prev: IPollResult) => ({
          ...prev,
          pages: [...newPages],
        }));
        return;
      }
      newPages[currentPage] = {
        title: poll?.pages[currentPage].title,
        answers: {
          ...newPages[currentPage]?.answers,
          [e.target.id]: {
            value: [e.target.value],
            title: e.target.name,
            type: QuestionType.SEVERAL_ANSWERS,
            first: poll?.pages[currentPage].questions.filter(
              (q: IQuestion) => q.id === e.target.id,
            )[0].first,
            second: poll?.pages[currentPage].questions.filter(
              (q: IQuestion) => q.id === e.target.id,
            )[0].second,
            third: poll?.pages[currentPage].questions.filter(
              (q: IQuestion) => q.id === e.target.id,
            )[0].third,
          },
        },
      };
      setResult!((prev: IPollResult) => ({
        ...prev,
        pages: [...newPages],
      }));
      return;
    }

    newPages[currentPage] = {
      title: poll?.pages[currentPage].title,
      answers: {
        ...newPages[currentPage]?.answers,
        [e.target.id]: {
          ...newPages[currentPage]?.answers[e.target.id]!,
          value: (
            newPages[currentPage]?.answers[e.target.id].value as string[]
          ).filter((value: string) => value !== e.target.value),
        },
      },
    };

    if (
      (newPages[currentPage]?.answers[e.target.id].value as string[]).length
    ) {
      (
        newPages as {
          answers: { [key: string]: IAnswer };
          title: string;
        }[]
      )[currentPage].answers = Object.fromEntries(
        Object.entries(newPages[currentPage]?.answers || {}).filter(
          (answer: (string | IAnswer)[]) => {
            return ((answer[1] as IAnswer).value as string[]).length;
          },
        ),
      );
      setResult!((prev: IPollResult) => ({
        ...prev,
        pages: [...newPages],
      }));
      return;
    }
    setResult!((prev: IPollResult) => ({
      ...prev,
      pages: [...newPages],
    }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newPages = [...result.pages];
    newPages[currentPage] = {
      title: poll?.pages[currentPage].title,
      answers: {
        ...newPages[currentPage]?.answers,
        [e.target.id]: {
          value: e.target.value,
          title: e.target.name,
          type: QuestionType.TEXT_ANSWER,
        },
      },
    };
    setResult!((prev: IPollResult) => ({
      ...prev,
      pages: newPages,
      title: poll?.title,
    }));
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPages = [...result.pages];
    newPages[currentPage] = {
      title: poll?.pages[currentPage].title,
      answers: {
        ...newPages[currentPage]?.answers,
        [e.target.id]: {
          value: e.target.value,
          title: e.target.name,
          type: QuestionType.RANGE_ANSWER,
        },
      },
    };
    setResult!((prev: IPollResult) => ({
      ...prev,
      pages: newPages,
      title: poll?.title,
    }));
  };

  const handleRatingChange = (values: {
    id: string;
    value: number;
    name: string;
  }) => {
    const newPages = [...result.pages];
    newPages[currentPage] = {
      title: poll?.pages[currentPage].title,
      answers: {
        ...newPages[currentPage]?.answers,
        [values.id]: {
          value: values.value,
          title: values.name,
          type: QuestionType.RATING_ANSWER,
        },
      },
    };
    setResult!((prev: IPollResult) => ({
      ...prev,
      pages: newPages,
      title: poll?.title,
    }));
  };

  if (question.type === QuestionType.ONE_ANSWER) {
    return (
      <div key={question.id}>
        <div className={styles.results__item}>
          <RadioGroup
            i={i}
            isResultPage={isResultPage}
            params={poll?.params}
            question={question}
            showWarning={
              isSubmitting &&
              requiredId?.includes(question.id) &&
              !chosenResult?.includes(question.id)
            }
            value={
              result.pages?.[currentPage]?.answers?.[question.id]
                ?.value as string
            }
            onChange={handleRadioGroupChange}
          />
        </div>
        <hr />
      </div>
    );
  }
  if (question.type === QuestionType.SEVERAL_ANSWERS) {
    return (
      <div key={question.id}>
        <div className={styles.results__item}>
          <CheckBoxGroup
            i={i}
            isResultPage={isResultPage}
            params={poll?.params}
            question={question}
            showWarning={
              isSubmitting &&
              requiredId?.includes(question.id) &&
              !chosenResult?.includes(question.id)
            }
            value={
              result.pages?.[currentPage]?.answers?.[question.id]
                ?.value as string[]
            }
            onChange={handleCheckBoxChange}
          />
        </div>
        <hr />
      </div>
    );
  }
  if (question.type === QuestionType.TEXT_ANSWER) {
    return (
      <div key={question.id}>
        <div className={styles.results__item}>
          <TextAnswer
            i={i}
            isResultPage={isResultPage}
            params={poll?.params}
            question={question}
            showWarning={
              isSubmitting &&
              requiredId?.includes(question.id) &&
              !chosenResult?.includes(question.id)
            }
            value={
              result.pages?.[currentPage]?.answers?.[question.id] as {
                value: string;
              }
            }
            onChange={handleTextAreaChange}
          />
        </div>
        <hr />
      </div>
    );
  }
  if (question.type === QuestionType.RANGE_ANSWER) {
    return (
      <div key={question.id}>
        <div className={styles.results__item}>
          <RangeAnswer
            i={i}
            isResultPage={isResultPage}
            params={poll?.params}
            question={question}
            showWarning={
              isSubmitting &&
              requiredId?.includes(question.id) &&
              !chosenResult?.includes(question.id)
            }
            value={
              result.pages?.[currentPage]?.answers?.[question.id]
                ?.value as number
            }
            onChange={handleRangeChange}
          />
        </div>
        <hr />
      </div>
    );
  }
  if (question.type === QuestionType.RATING_ANSWER) {
    return (
      <div key={question.id}>
        <div className={styles.results__item}>
          <RatingAnswer
            i={i}
            isResultPage={isResultPage}
            params={poll?.params!}
            question={question}
            showWarning={
              isSubmitting &&
              requiredId?.includes(question.id) &&
              !chosenResult?.includes(question.id)
            }
            value={
              result.pages?.[currentPage]?.answers?.[question.id]
                ?.value as number
            }
            onChange={handleRatingChange}
          />
        </div>
        <hr />
      </div>
    );
  }
  return null;
};
