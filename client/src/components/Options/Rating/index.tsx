import { useState, FC, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { multipleClasses } from 'src/helpers/multipleClasses';
import { IParams } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  i: number;
  params: IParams;
  question: IQuestion;
  showWarning?: boolean;
  value?: number;
  onChange?:
    | ((arg: { id: string; value: number; name: string }) => void)
    | undefined;
  isResultPage?: boolean;
}

export const RatingAnswer: FC<Props> = ({
  question,
  onChange,
  i,
  params,
  showWarning,
  isResultPage,
  value: currentValue,
}) => {
  const { t } = useTranslation();
  const { title, required, id, value: resultValue } = question;
  const { showQuestionNumbers, showRequired } = params;

  const [ratingValue, setCurrentValue] = useState(
    resultValue || currentValue || 0,
  );

  useEffect(() => {
    if (!ratingValue) return;
    setCurrentValue(resultValue || currentValue || 0);
  }, [resultValue, currentValue, ratingValue]);

  const rating = Array(5)
    .fill(false)
    .map((_, idx: number) => idx < ratingValue);

  const handleRatingClick = (idx: number) => {
    setCurrentValue(idx);
  };
  const changeResults = (res: number) => {
    handleRatingClick(res);
    return onChange ? onChange({ id, value: res, name: title }) : null;
  };

  const handleCLick = (idx: number) => {
    return onChange
      ? () => changeResults(idx + 1)
      : () => handleRatingClick(idx + 1);
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
      <div className={styles.option__rating}>
        {rating.map((star: boolean, idx: number) => (
          <div key={idx.toString()}>
            <input
              readOnly
              checked={star}
              className={multipleClasses(
                styles.option__rating_input,
                isResultPage ? styles.disabled : '',
              )}
              disabled={isResultPage}
              id={`${id}/${idx.toString()}`}
              type="radio"
              onClick={handleCLick(idx)}
            />
            <label htmlFor={`${id}/${idx.toString()}`}>{}</label>
          </div>
        ))}
      </div>
    </>
  );
};
export default RatingAnswer;
