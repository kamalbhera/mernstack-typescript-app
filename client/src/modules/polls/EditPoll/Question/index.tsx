import {
  useState,
  forwardRef,
  useEffect,
  ReactElement,
  ReactNode,
} from 'react';

import CheckBoxGroup from 'src/components/Options/CheckBoxGroup';
import RadioGroup from 'src/components/Options/RadioGroup';
import RangeAnswer from 'src/components/Options/Range';
import RatingAnswer from 'src/components/Options/Rating';
import TextAnswer from 'src/components/Options/Text';
import { useShowNotification } from 'src/hooks/useShowNotification';
import { IPoll } from 'src/types/Poll';
import { IEditableQuestion, IQuestion, QuestionType } from 'src/types/Question';

import { EditableInputGroup } from '../Options/EditableInputGroup';
import { EditableRangeAnswer } from '../Options/EditableRange';
import { EditableRatingAnswer } from '../Options/EditableRating';
import { EditableTextAnswer } from '../Options/EditableText';
import { QuestionTemplate } from './QuestionTemplate';
import styles from './styles.module.scss';

interface Props {
  dragHandleProps: any;
  draggableProps: any;
  item: IQuestion;
  poll: IPoll;
  i: number;
  setPoll: (value: any) => void;
  currentPage: number;
}

export const Question = forwardRef<ReactNode, Props>(
  (
    { dragHandleProps, item, draggableProps, poll, i, setPoll, currentPage },
    ref,
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const { showWarning } = useShowNotification();

    useEffect(() => {
      setIsEditing(false);
    }, [currentPage]);

    const [values, setValues] = useState<IEditableQuestion>({});

    const handleSave = () => {
      const newPoll = [...poll.pages];
      if (
        poll.pages[currentPage].questions.filter(
          (question: IQuestion) => question.title === values.title,
        ).length > 0 &&
        poll.pages[currentPage].questions[i].title !== values.title
      ) {
        showWarning('Такое имя вопроса уже есть');
        return;
      }
      newPoll[currentPage].questions.splice(i, 1, {
        ...poll.pages[currentPage].questions[i],
        ...values,
      });

      setPoll((prev: IPoll) => {
        return {
          ...prev,
          pages: newPoll,
        };
      });
      setIsEditing(false);
      setValues({});
    };

    const handleCancel = () => {
      setIsEditing(false);
      setValues({});
    };

    const handleRemove = () => {
      const newPoll = [...poll.pages];
      newPoll[currentPage].questions.splice(i, 1);
      setPoll((prev: IPoll) => {
        return {
          ...prev,
          pages: newPoll,
        };
      });
      setIsEditing(false);
      setValues({});
    };

    const typeToComponent = (type: string) => {
      const questionByType = (
        Option: ReactElement,
        Component: ReactElement,
      ) => {
        return (
          <QuestionTemplate
            actions={{
              save: handleSave,
              remove: handleRemove,
              cancel: handleCancel,
            }}
            dragHandleProps={dragHandleProps}
            isEditing={isEditing}
            option={Option}
            question={item}
            setIsEditing={setIsEditing}
            setValues={setValues}
            values={values}
          >
            {Component}
          </QuestionTemplate>
        );
      };

      if (type === QuestionType.ONE_ANSWER) {
        return questionByType(
          <RadioGroup
            isResultPage
            i={i}
            params={poll?.params}
            question={item}
          />,
          <EditableInputGroup
            i={i}
            item={item}
            setValues={setValues}
            values={values}
          />,
        );
      }
      if (type === QuestionType.SEVERAL_ANSWERS) {
        return questionByType(
          <CheckBoxGroup
            isResultPage
            i={i}
            params={poll?.params}
            question={item}
          />,
          <EditableInputGroup
            i={i}
            item={item}
            setValues={setValues}
            values={values}
          />,
        );
      }
      if (type === QuestionType.TEXT_ANSWER) {
        return questionByType(
          <TextAnswer
            isResultPage
            i={i}
            params={poll?.params}
            question={item}
          />,
          <EditableTextAnswer
            i={i}
            item={item}
            setValues={setValues}
            values={values}
          />,
        );
      }
      if (type === QuestionType.RATING_ANSWER) {
        return questionByType(
          <RatingAnswer
            isResultPage
            i={i}
            params={poll?.params}
            question={item}
          />,
          <EditableRatingAnswer
            i={i}
            item={item}
            setValues={setValues}
            values={values}
          />,
        );
      }
      if (type === QuestionType.RANGE_ANSWER) {
        return questionByType(
          <RangeAnswer
            isResultPage
            i={i}
            params={poll?.params}
            question={item}
          />,
          <EditableRangeAnswer
            i={i}
            item={item}
            setValues={setValues}
            values={values}
          />,
        );
      }
    };

    return (
      <div ref={ref} className={styles.question} {...draggableProps}>
        <span {...dragHandleProps} />
        {item.type && typeToComponent(item.type)}
      </div>
    );
  },
);
