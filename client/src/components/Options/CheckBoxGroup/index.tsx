import { ChangeEventHandler, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IParams } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  i: number;
  params?: IParams;
  question: IQuestion;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  showWarning?: boolean;
  isResultPage?: boolean;
  value?: string[];
}

const CheckBoxGroup: FC<Props> = ({
  question,
  onChange,
  i,
  isResultPage,
  params,
  showWarning,
  value: currentValue,
}) => {
  const {
    title,
    first,
    second,
    third,
    required,
    id,
    value: resultValue,
  } = question;
  const { t } = useTranslation();
  const { showQuestionNumbers, showRequired } = params!;

  return (
    <>
      {showWarning && (
        <div className={styles.option__answer_warning}>
          {t('form.warning.required')}
        </div>
      )}
      <div className={styles.option__answer_title}>
        {showQuestionNumbers && `${i + 1}.`} {title}
        {required && showRequired && ' (*)'}
      </div>
      <div className={styles.option__answer_variant}>
        <label>
          <input
            checked={
              (resultValue as string[])?.includes(first!) ||
              currentValue?.includes(first!) ||
              false
            }
            disabled={isResultPage}
            id={id}
            name={title}
            type="checkbox"
            value={first}
            onChange={onChange || undefined}
          />
          <span>{first}</span>
        </label>
      </div>
      <div className={styles.option__answer_variant}>
        <label>
          <input
            checked={
              (resultValue as string[])?.includes(second!) ||
              currentValue?.includes(second!) ||
              false
            }
            disabled={isResultPage}
            id={id}
            name={title}
            type="checkbox"
            value={second}
            onChange={onChange || undefined}
          />
          <span>{second}</span>
        </label>
      </div>
      <div className={styles.option__answer_variant}>
        <label>
          <input
            checked={
              (resultValue as string[])?.includes(third!) ||
              currentValue?.includes(third!) ||
              false
            }
            disabled={isResultPage}
            id={id}
            name={title}
            type="checkbox"
            value={third}
            onChange={onChange || undefined}
          />
          <span>{third}</span>
        </label>
      </div>
    </>
  );
};
export default CheckBoxGroup;
