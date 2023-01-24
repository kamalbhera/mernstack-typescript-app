import { FC, useState } from 'react';

import { IEditableQuestion, IQuestion } from 'src/types/Question';

import { OptionLayout } from '../common';
import styles from './styles.module.scss';

interface Props{
  item: IQuestion;
  i: number;
  values: IEditableQuestion;
  setValues: (arg: IEditableQuestion) => void;
}
export const EditableRatingAnswer: FC<Props> = ({
  item,
  i: id,
  values,
  setValues,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const rating = Array(5)
    .fill(false)
    .map((_, i: number) => i < currentValue);
  const handleRatingClick = (i: number) => {
    setCurrentValue(i);
  };
  return (
    <OptionLayout i={id} item={item} setValues={setValues} values={values}>
      <div className={styles.editRating}>
        {rating.map((star: boolean, i: number) => (
          <div key={`${id}/${i.toString()}`}>
            <input
              key={`${id}/${i.toString()}`}
              disabled
              readOnly
              checked={star}
              className={styles.editRating_input}
              id={`${id}/${i.toString()}`}
              type="radio"
              onClick={() => handleRatingClick(i + 1)}
            />
            <label htmlFor={`${id}/${i.toString()}`}>{}</label>
          </div>
        ))}
      </div>
    </OptionLayout>
  );
};
