import { FC, useContext, useEffect, useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { usePoll } from 'src/api/poll';
import { useTemplate } from 'src/api/template';
import DeleteIcon from 'src/assets/icons/DeleteIcon';
import Button from 'src/components/Button';
import { Modal } from 'src/components/Modal';
import ProgressBar from 'src/components/ProgressBar';
import { AuthContext, UserContext } from 'src/context/authContext';
import { IPoll } from 'src/types/Poll';
import { IQuestion } from 'src/types/Question';

import { Question } from '../Question';
import styles from './styles.module.scss';

interface Props {
  poll: any;
  setPoll: (value: any) => void;
  currentPage: number;
  initialState: IPoll;
  setCurrentPage: (value: number) => void;
}
export const PollSchema: FC<Props> = ({
  poll,
  currentPage,
  initialState,
  setPoll,
  setCurrentPage,
}) => {
  const { t } = useTranslation();
  const { userId = null } = useContext<UserContext>(AuthContext);
  const { pollId = null, templateId = null } = useParams<string>();
  const path = useLocation().pathname;

  const { useCreatePoll, useUpdatePoll } = usePoll();
  const { useCreateTemplate, useUpdateTemplate } = useTemplate();

  const { mutate: createPoll } = useCreatePoll();
  const { mutate: updatePoll } = useUpdatePoll(pollId);

  const { mutate: createTemplate } = useCreateTemplate();
  const { mutate: updateTemplate } = useUpdateTemplate(templateId);

  const [isShowSaveModal, setIsShowSaveModal] = useState(false);
  const [isShowSaveTemplateModal, setIsShowSaveTemplateModal] = useState(false);
  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

  const navigate = useNavigate();
  const isPollPage = path.includes('polls');

  useEffect(() => {
    if (!pollId && !templateId) {
      setPoll(initialState);
    }
  }, [pollId, templateId, setPoll, initialState]);

  const handleAddPage = () => {
    setPoll((prev: IPoll) => {
      return {
        ...prev,
        pages: [
          ...prev.pages,
          {
            title: `${t('editPollsPage.page')} ${
              Number(prev.pages.length) + 1
            }`,
            questions: [],
          },
        ],
      };
    });
  };
  const handleCancel = () => {
    setPoll(initialState);
    if (!templateId) {
      navigate('/polls');
      return;
    }
    navigate('/templates');
  };

  const handleSavePoll = () => {
    if (pollId) {
      updatePoll({
        poll,
      });
      return;
    }
    createPoll({
      userId: userId || null,
      poll,
    });
  };

  const handleSaveTemplate = () => {
    if (templateId) {
      updateTemplate({
        template: poll,
      });
      return;
    }
    createTemplate({
      poll,
    });
  };

  const handlePollTitleChange = (value: string) => {
    setPoll((prev: IPoll) => ({ ...prev, title: value }));
  };

  const handlePageTitleChange = (value: string) => {
    setPoll((prev: IPoll) => ({
      ...prev,
      pages: prev.pages.map(
        (page: { title: string; questions: IQuestion[] }, i: number) =>
          currentPage === i ? { ...page, title: value } : page,
      ),
    }));
  };

  const handlePageRemove = () => {
    if (poll.pages.length === 1) {
      setPoll(initialState);
      return;
    }
    const newPages = [...poll.pages];
    newPages.splice(currentPage, 1);
    setPoll((prev: IPoll) => ({ ...prev, pages: newPages }));
    setCurrentPage(0);
  };

  if (!userId) {
    return null;
  }
  return (
    <>
      <div className={styles.poll__header}>
        <div className={styles.poll__header_title}>
          <span>{t('editPollsPage.pollTitle')}:</span>
          <input
            type="text"
            value={poll.title}
            onChange={(e) => handlePollTitleChange(e.target.value)}
          />
        </div>
        {`${t('editPollsPage.totalQuestions')}: ${poll?.pages.reduce(
          (sum: number, current: { title: string; questions: IQuestion[] }) => {
            return sum + Number(current.questions.length);
          },
          0,
        )}, ${t('editPollsPage.totalPages')}: ${poll?.pages.length}`}
      </div>
      <div className={styles.poll__group_btns}>
        <div className={styles.poll__left_btns}>
          <Button variant="small" onClick={() => setIsShowSaveModal(true)}>
            {isPollPage
              ? t('editPollsPage.savePoll')
              : t('editPollsPage.saveTemplate')}
          </Button>
          {!templateId && isPollPage && (
            <Button
              variant="small"
              onClick={() => setIsShowSaveTemplateModal(true)}
            >
              {t('editPollsPage.saveAsTemplate')}
            </Button>
          )}
          <Button variant="small" onClick={() => setIsShowCancelModal(true)}>
            {t('editPollsPage.cancel')}
          </Button>
        </div>
        <div className={styles.poll__right_btns}>
          <Button variant="small" onClick={handleAddPage}>
            {t('editPollsPage.addPage')}
          </Button>
        </div>
      </div>
      <div className={styles.poll__pages}>
        {poll?.pages.map(
          (item: { title: string; questions: IQuestion[] }, i: number) => {
            return (
              <div
                key={`${item.title}${i.toString()}`}
                className={currentPage === i ? styles.poll__active_page : ''}
                role="presentation"
                onClick={() => setCurrentPage(i)}
              >
                {item.title}
              </div>
            );
          },
        )}
      </div>
      {poll.pages[currentPage]?.questions.length ? (
        <>
          <div className={styles.poll__main}>
            <div className={styles.poll__main_title}>
              {poll.params.showPageNumbers && (
                <input
                  type="text"
                  value={poll?.pages[currentPage].title || ''}
                  onChange={(e) => handlePageTitleChange(e.target.value)}
                />
              )}
              {poll?.pages.length && (
                <DeleteIcon
                  className={styles.icon}
                  onClick={handlePageRemove}
                />
              )}
            </div>
            <DragDropContext
              onDragEnd={(param) => {
                const srcI = param.source.index;
                const desI = param.destination?.index;
                if (desI || desI === 0) {
                  poll.pages[currentPage].questions.splice(
                    desI,
                    0,
                    poll.pages[currentPage].questions.splice(srcI, 1)[0],
                  );
                }
              }}
            >
              <Droppable droppableId="droppable-1">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {poll?.pages[currentPage].questions.map(
                      (item: IQuestion, i: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={`draggable-${item.id}`}
                          index={i}
                        >
                          {(p) => (
                            <Question
                              ref={p.innerRef}
                              currentPage={currentPage}
                              dragHandleProps={{ ...p.dragHandleProps }}
                              draggableProps={{ ...p.draggableProps }}
                              i={i}
                              item={item}
                              poll={poll}
                              setPoll={setPoll}
                            />
                          )}
                        </Draggable>
                      ),
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {poll.params.showProgressBar && (
            <ProgressBar
              completed={Math.floor(
                ((currentPage + 1) / poll.pages.length) * 100,
              )}
              currentPage={currentPage + 1}
              totalPages={poll?.pages.length}
            />
          )}
        </>
      ) : (
        <>
          <div className={styles.poll__blank}>
            <div className={styles.poll__main_title}>
              {poll.params.showPageNumbers && (
                <input
                  type="text"
                  value={poll?.pages[currentPage]?.title || ''}
                  onChange={(e) => handlePageTitleChange(e.target.value)}
                />
              )}
              {poll?.pages.length && (
                <DeleteIcon
                  className={styles.icon}
                  onClick={handlePageRemove}
                />
              )}
            </div>
          </div>
          {poll.params.showProgressBar && (
            <ProgressBar
              completed={Math.floor(
                ((currentPage + 1) / poll.pages.length) * 100,
              )}
              currentPage={currentPage + 1}
              totalPages={poll?.pages.length}
            />
          )}
        </>
      )}
      {isShowSaveModal ? (
        <Modal
          action={isPollPage ? handleSavePoll : handleSaveTemplate}
          headline={
            isPollPage
              ? t('modal.headlineSavePoll')
              : t('modal.headlineSaveTemplate')
          }
          hideModalHandler={() => setIsShowSaveModal(false)}
          isActiveModal={isShowSaveModal}
          message={
            isPollPage
              ? t('modal.message.savePoll')
              : t('modal.message.saveTemplate')
          }
        />
      ) : null}
      {isShowSaveTemplateModal ? (
        <Modal
          action={handleSaveTemplate}
          headline={t('modal.headlineSaveTemplate')}
          hideModalHandler={() => setIsShowSaveTemplateModal(false)}
          isActiveModal={isShowSaveTemplateModal}
          message={t('modal.message.saveTemplate')}
        />
      ) : null}
      {isShowCancelModal ? (
        <Modal
          action={handleCancel}
          headline={t('modal.headlineCancel')}
          hideModalHandler={() => setIsShowCancelModal(false)}
          isActiveModal={isShowCancelModal}
          message={t('modal.message.cancel')}
        />
      ) : null}
    </>
  );
};
