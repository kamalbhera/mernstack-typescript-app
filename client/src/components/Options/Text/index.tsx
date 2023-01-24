import { ChangeEventHandler, FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IParams } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  i: number;
  params?: IParams;
  question: IQuestion;
  value?: { value: string };
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  showWarning?: boolean;
  isResultPage?: boolean;
}

const TextAnswer: FC<Props> = ({
  value,
  question,
  onChange,
  i,
  params,
  showWarning,
  isResultPage,
}) => {
  const { t } = useTranslation();
  const { title, text, required, id } = question;
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
      <textarea
        className={styles.option__answer_textarea}
        disabled={isResultPage}
        id={id}
        name={title}
        placeholder={text}
        value={question?.value || value?.value}
        onChange={onChange || undefined}
      />
    </>
  );
};
export default TextAnswer;
