import { useState, FC } from 'react';

import { format } from 'date-fns-tz';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import DeleteIcon from 'src/assets/icons/DeleteIcon';
import EditIcon from 'src/assets/icons/EditIcon';
import { Modal } from 'src/components/Modal';
import { TableRow } from 'src/components/Table/TableRow';
import { IPoll } from 'src/types/Poll';

import styles from './styles.module.scss';

interface Props {
  action: (pollId: string) => void;
  item: {
    poll: IPoll;
    _id: string;
    updatedAt: string;
    totalResults: number;
  };
}
export const PollRow: FC<Props> = ({ action, item }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { t } = useTranslation();

  const handleClick = (id: string) => {
    return () => action(id);
  };
  return (
    <>
      <TableRow className={styles.polls__tr}>
        <td>{item.poll.title}</td>
        <td>{format(new Date(item.updatedAt), 'MMM dd yyyy HH:mm')}</td>
        <td>{item.totalResults || 0}</td>
        <td className={styles.polls__tr_link}>
          <Link to={`/polls/${item._id}`}>{t('pollsPage.linkLabel')}</Link>
        </td>

        <td className={styles.polls__actions}>
          <Link to={`/polls/${item._id}/edit`}>
            <EditIcon className={styles.icon} />
          </Link>
          <DeleteIcon
            className={styles.icon}
            onClick={() => setIsShowModal(true)}
          />
        </td>
      </TableRow>
      {isShowModal ? (
        <Modal
          action={handleClick(item._id)}
          headline={t('modal.headlineDeletePoll')}
          hideModalHandler={() => setIsShowModal(false)}
          isActiveModal={isShowModal}
          message={t('modal.message.deletePoll')}
        />
      ) : null}
    </>
  );
};
