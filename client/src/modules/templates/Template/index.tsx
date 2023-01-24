import { useState, FC } from 'react';

import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from 'src/assets/icons/DeleteIcon';
import EditIcon from 'src/assets/icons/EditIcon';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import { Row } from 'src/components/Row';
import { multipleClasses } from 'src/helpers/multipleClasses';
import { ITemplate } from 'src/types/Templates';

import styles from './styles.module.scss';

interface Props {
  item: ITemplate;
  totalQuestions: number;
  handleDeleteTemplate: (id: string) => void;
}
export const Template: FC<Props> = ({
  item,
  totalQuestions,
  handleDeleteTemplate,
}) => {
  const [active, setActive] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);

  const handleEdit = () => {
    navigate(`/templates/${item._id}/edit`);
  };
  const handleCreatePoll = () => {
    navigate(`/polls/${item._id}/new`);
  };

  const handleMouseEnter = () => {
    setActive(true);
  };
  const handleMouseLeave = () => {
    setActive(false);
  };
  const handleRemove = () => {
    handleDeleteTemplate(item._id);
  };

  return (
    <div
      className={multipleClasses(
        styles.template__item_wrapper,
        active ? styles.active : '',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {active && (
        <div className={styles.template__iconWrapper}>
          <EditIcon className={styles.editIcon} onClick={handleEdit} />
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={() => setIsShowModal(true)}
          />
        </div>
      )}
      <div className={styles.template__item}>
        <Row>{item.template.title}</Row>
        <hr />
        <div className={styles.template__item_info}>
          <div>
            {`${t('templatesPage.totalPages')}: ${Number(
              item.template.pages.length,
            )}`}
          </div>
          <div>
            {t('templatesPage.totalQuestions')}: {totalQuestions}
          </div>
        </div>
        <div>
          {`${t('templatesPage.changed')}: ${format(
            new Date(item.updatedAt),
            'MMM dd yyyy HH:mm',
          )}`}
        </div>
        <div className={styles.template__item_button}>
          <Button variant="small" onClick={handleCreatePoll}>
            {t('templatesPage.createPoll')}
          </Button>
        </div>
      </div>
      {isShowModal ? (
        <Modal
          action={handleRemove}
          headline={t('modal.headlineDeleteTemplate')}
          hideModalHandler={() => setIsShowModal(false)}
          isActiveModal={isShowModal}
          message={t('modal.message.deleteTemplate')}
        />
      ) : null}
    </div>
  );
};
