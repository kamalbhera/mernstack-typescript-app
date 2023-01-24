import { FC } from 'react';

import { IEditableQuestion, IQuestion } from 'src/types/Question';

import { OptionLayout } from '../common';
import styles from './styles.module.scss';

interface Props {
  item: IQuestion;
  i: number;
  values: IEditableQuestion;
  setValues: (arg: IEditableQuestion) => void;
}
export const EditableTextAnswer: FC<Props> = ({
  item,
  i,
  values,
  setValues,
}) => {
  return (
    <OptionLayout i={i} item={item} setValues={setValues} values={values}>
      <textarea
        disabled
        className={styles.editTextarea}
        placeholder={item.text}
      />
    </OptionLayout>
  );
};
