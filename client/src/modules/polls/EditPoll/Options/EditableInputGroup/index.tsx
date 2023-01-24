import { FC } from 'react';

import { IEditableQuestion, IQuestion, QuestionType } from 'src/types/Question';

import { OptionLayout } from '../common';
import styles from './styles.module.scss';

interface Props {
  item: IQuestion;
  i: number;
  values: IEditableQuestion;
  setValues: (arg: IEditableQuestion) => void;
}
export const EditableInputGroup: FC<Props> = ({
  item,
  i,
  values,
  setValues,
}) => {
  const { first, second, third, type } = item;

  const inputType = () => {
    return type === QuestionType.ONE_ANSWER ? 'radio' : 'checkbox';
  };
  return (
    <OptionLayout i={i} item={item} setValues={setValues} values={values}>
      <div className={styles.edit__answer}>
        <input
          disabled
          className={styles.edit__answer_radio}
          name="radiogroup"
          type={inputType()}
        />
        <input
          className={styles.edit__answer_text}
          defaultValue={first}
          type="text"
          onChange={(e) => setValues({ ...values, first: e.target.value })}
        />
      </div>
      <div className={styles.edit__answer}>
        <input
          disabled
          className={styles.edit__answer_radio}
          name="radiogroup"
          type={inputType()}
        />
        <input
          defaultValue={second}
          type="text"
          onChange={(e) => setValues({ ...values, second: e.target.value })}
        />
      </div>
      <div className={styles.edit__answer}>
        <input
          disabled
          className={styles.edit__answer_radio}
          name="radiogroup"
          type={inputType()}
        />
        <input
          defaultValue={third}
          type="text"
          onChange={(e) => setValues({ ...values, third: e.target.value })}
        />
      </div>
    </OptionLayout>
  );
};
