import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useEffect,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';

import { IParams } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  i: number;
  params?: IParams;
  question: IQuestion;
  value?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  showWarning?: boolean;
  isResultPage?: boolean;
}

const RangeAnswer: FC<Props> = ({
  i,
  value: currentValue,
  question,
  params,
  showWarning,
  onChange,
  isResultPage,
}) => {
  const { t } = useTranslation();
  const { title, required, id, value: resultValue } = question;

  const [rangeValue, setRangeValue] = useState(
    resultValue || currentValue || 0,
  );

  useEffect(() => {
    if (!rangeValue) return;
    setRangeValue(resultValue || currentValue || rangeValue);
  }, [resultValue, currentValue, rangeValue]);

  const { showQuestionNumbers, showRequired } = params!;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
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
      <div className={styles.option__range_container}>
        <div className={styles.option__range_wrapper}>
          <span>0</span>
          <input
            className={styles.option__range_input}
            disabled={isResultPage}
            id={id}
            max="100"
            min="0"
            name={title}
            step="1"
            type="range"
            value={rangeValue}
            onChange={handleChange}
          />
          <span>100</span>
        </div>
        <div className={styles.option__range_output}>
          <span
            className={styles.option__range_value}
            style={{
              left: `${Number(rangeValue)}%`,
            }}
          >
            {rangeValue}
          </span>
        </div>
      </div>
    </>
  );
};
export default RangeAnswer;
