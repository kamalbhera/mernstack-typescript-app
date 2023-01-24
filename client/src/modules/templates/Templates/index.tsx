import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useTemplate } from 'src/api/template';
import { EmptyResult } from 'src/components/EmptyResult';
import SidebarLayout from 'src/components/layouts/SidebarLayout';
import { Pagination } from 'src/components/Pagination';
import { Spinner } from 'src/components/Spinner';
import { TitleRow } from 'src/components/TitleRow';
import { PAGE_SKIP, TEMPLATES_PER_PAGE } from 'src/consts';
import { separator } from 'src/helpers/separator';
import { setPageTitle } from 'src/helpers/setPageTitle';
import { IQuestion } from 'src/types/Question';
import { ITemplate, ITemplates } from 'src/types/Templates';

import { Template } from '../Template';
import styles from './styles.module.scss';

export const Templates = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ITemplates>({
    templates: [],
    totalItems: 0,
  });
  const [skip, setSkip] = useState(PAGE_SKIP);
  const { t } = useTranslation();
  const { useGetTemplates, useDeleteTemplate } = useTemplate();

  const { refetch, isFetching } = useGetTemplates(
    {
      size: TEMPLATES_PER_PAGE,
      skip,
    },
    setItems,
  );
  const { mutate: deleteTemplate } = useDeleteTemplate();

  useEffect(() => {
    refetch();
  }, [skip, refetch]);

  const handleNewTemplate = () => {
    navigate('/templates/new');
  };
  const { templates, totalItems } = items;
  const currentPage = skip / TEMPLATES_PER_PAGE + 1;
  const totalPages = Math.ceil(totalItems / TEMPLATES_PER_PAGE);

  const handleDeleteTemplate = useCallback(
    (templateId: string) => {
      if (templates.length === 1 && skip > 0) {
        deleteTemplate(templateId);
        setSkip(skip - TEMPLATES_PER_PAGE);
      } else {
        deleteTemplate(templateId);
      }
    },
    [deleteTemplate, templates, skip],
  );

  setPageTitle(t('templatesPage.title'));

  return (
    <SidebarLayout>
      <TitleRow
        buttonTitle={t('templatesPage.newTemplate')}
        title={t('templatesPage.title')}
        onClick={handleNewTemplate}
      />
      <>
        {templates?.length ? (
          <>
            <div className={styles.templates__table}>
              {templates?.map((item: ITemplate) => (
                <Template
                  key={item._id}
                  handleDeleteTemplate={handleDeleteTemplate}
                  item={item}
                  totalQuestions={item.template.pages.reduce(
                    (
                      acc: number,
                      page: { questions: IQuestion[]; title: string },
                    ) => {
                      return acc + Number(page.questions.length);
                    },
                    0,
                  )}
                />
              ))}
            </div>
            <div className={styles.templates__table_footer}>
              {separator(
                t('table.total', {
                  totalItems,
                }),
                t('table.page', {
                  pageNumber: currentPage,
                  totalPages,
                }),
              )}
              <Pagination
                perPage={TEMPLATES_PER_PAGE}
                setSkip={setSkip}
                skip={skip}
                totalItems={totalItems}
              />
            </div>
          </>
        ) : null}
        {!templates.length && isFetching && <Spinner />}
        {!templates.length && !isFetching && (
          <EmptyResult text={t('templatesPage.noResults')} />
        )}
      </>
    </SidebarLayout>
  );
};
export default Templates;
