export const setPageTitle = (title: string) => {
  document.title = `QUESTIONNAIRES${title ? ` | ${title}` : ''}`;
};
