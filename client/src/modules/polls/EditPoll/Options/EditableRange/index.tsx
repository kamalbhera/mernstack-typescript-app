import { ChangeEvent, FC, useState } from 'react';

import { IEditableQuestion, IQuestion } from 'src/types/Question';

import { OptionLayout } from '../common';
import styles from './styles.module.scss';

interface Props {
  item: IQuestion;
  i: number;
  values: IEditableQuestion;
  setValues: (arg: IEditableQuestion) => void;
}
export const EditableRangeAnswer: FC<Props> = ({
  item,
  i,
  values,
  setValues,
}) => {
  const [currentValue, SetValue] = useState(item.value);
  return (
    <OptionLayout i={i} item={item} setValues={setValues} values={values}>
      <div className={styles.option__range_container}>
        <div className={styles.option__range_wrapper}>
          <span>0</span>
          <input
            disabled
            className={styles.option__range_input}
            defaultValue={currentValue}
            max="100"
            min="0"
            step="1"
            type="range"
            onChange={(e: ChangeEvent<HTMLInputElement>) => SetValue(e.target.value)}
          />
          <span>100</span>
        </div>
        <div className={styles.option__range_output}>
          <span
            className={styles.option__range_value}
            style={{ left: `${Number(currentValue)}%` }}
          >
            {currentValue}
          </span>
        </div>
      </div>
    </OptionLayout>
  );
};
