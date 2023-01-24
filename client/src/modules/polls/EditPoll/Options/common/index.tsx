import { FC } from 'react';

import { IEditableQuestion, IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  item: IQuestion;
  i: number;
  values: IEditableQuestion;
  setValues: (arg: IEditableQuestion) => void;
}
export const OptionLayout: FC<Props> = ({
  item,
  i,
  values,
  setValues,
  children,
}) => {
  const { title } = item;

  return (
    <>
      <div>
        <span> {i + 1}.</span>
        <input
          className={styles.edit__inputWithIndex}
          defaultValue={title}
          type="text"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        {children}
      </div>
    </>
  );
};
