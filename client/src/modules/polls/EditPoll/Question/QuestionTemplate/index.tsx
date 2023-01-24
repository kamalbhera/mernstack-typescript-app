import { FC, ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import DeleteIcon from 'src/assets/icons/DeleteIcon';
import DragIcon from 'src/assets/icons/DragIcon';
import EditIcon from 'src/assets/icons/EditIcon';
import { Button } from 'src/components/Button';
import { multipleClasses } from 'src/helpers/multipleClasses';
import { IEditableQuestion, IQuestion } from 'src/types/Question';

import styles from './styles.module.scss';

interface Props {
  i?: number;
  isEditing: boolean;
  setIsEditing: (arg: boolean) => void;
  dragHandleProps?: any;
  actions: { save: () => void; remove: () => void; cancel: () => void };
  setValues: (arg: any) => void;
  values?: IEditableQuestion;
  question: IQuestion;
  option: ReactNode;
}

export const QuestionTemplate: FC<Props> = ({
  option,
  isEditing,
  setIsEditing,
  dragHandleProps,
  actions,
  setValues,
  values,
  question,
  children,
}) => {
  const { save = undefined, remove = undefined, cancel = undefined } = actions;
  const handleSetEdit = () => {
    setIsEditing(true);
  };
  const { t } = useTranslation();
  return (
    <div
      className={multipleClasses(
        styles.option__wrapper,
        isEditing ? styles.option__edited : '',
      )}
    >
      {!isEditing ? (
        <>
          <div className={styles.option__header}>
            <EditIcon className={styles.icon} onClick={handleSetEdit} />
          </div>
          {option}
        </>
      ) : (
        <>
          <div className={styles.option__header}>
            <div {...dragHandleProps}>
              <DragIcon className={styles.option__dragIcon} />
            </div>
            <div className={styles.option__header_right}>
              <label>
                <div className={styles.option__required}>
                  <input
                    defaultChecked={
                      question ? question.required : values?.required
                    }
                    type="checkbox"
                    onChange={() =>
                      setValues(() => {
                        return {
                          ...values,
                          required: question
                            ? !question.required
                            : !values?.required,
                        };
                      })
                    }
                  />
                  <span>{t('editPollsPage.question.required')}</span>
                </div>
              </label>
              <DeleteIcon className={styles.icon} onClick={remove} />
            </div>
          </div>
          {children}
          <div className={styles.option__btns}>
            <Button variant="small" onClick={save}>
              {t('form.button.saveButton')}
            </Button>
            <Button variant="small" onClick={cancel}>
              {t('form.button.cancelButton')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
