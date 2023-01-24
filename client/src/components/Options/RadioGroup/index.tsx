import { ChangeEventHandler, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IParams } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  i: number;
  isResultPage?: boolean;
  params?: IParams;
  question: IQuestion;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  showWarning?: boolean;
  value?: string;
}

const RadioGroup: FC<Props> = ({
  question,
  onChange,
  i,
  isResultPage,
  params,
  showWarning,
  value: currentValue,
}) => {
  const { t } = useTranslation();
  const {
    title,
    first,
    second,
    third,
    required,
    id,
    value: resultValue,
  } = question;
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
            key={id}
            checked={resultValue === first || currentValue === first || false}
            disabled={isResultPage}
            id={id}
            name={`${i}/${title}`}
            type="radio"
            value={first || undefined}
            onChange={onChange || undefined}
          />
          <span>{first}</span>
        </label>
      </div>
      <div className={styles.option__answer_variant}>
        <label>
          <input
            key={id}
            checked={resultValue === second || currentValue === second || false}
            disabled={isResultPage}
            id={id}
            name={`${i}/${title}`}
            type="radio"
            value={second || undefined}
            onChange={onChange || undefined}
          />
          <span>{second}</span>
        </label>
      </div>
      <div className={styles.option__answer_variant}>
        <label>
          <input
            key={id}
            checked={resultValue === third || currentValue === third || false}
            disabled={isResultPage}
            id={id}
            name={`${i}/${title}`}
            type="radio"
            value={third || undefined}
            onChange={onChange || undefined}
          />
          <span>{third}</span>
        </label>
      </div>
    </>
  );
};
export default RadioGroup;
