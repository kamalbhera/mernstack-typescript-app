export const PER_PAGE = 5;
export const TEMPLATES_PER_PAGE = 6;
export const PAGE_SKIP = 0;
export const initialPoll = {
  params: {
    showQuestionNumbers: true,
    isAnonymous: false,
    isRandomOrder: false,
    showPageNumbers: true,
    showProgressBar: true,
    showRequired: true,
  },
  pages: [],
  title: '',
};
export const routes = {
  addPoll: '/polls/new',
  addTemplate: '/templates/new',
  users: '/users',
  polls: '/polls',
  templates: '/templates',
  results: '/results',
};
export const authRoutes = {
  login: '/auth/login',
  loginWithRedirect: '/auth/login/redirect',
  signup: '/auth/signup',
  signupWithRedirect: '/auth/signup/redirect',
};
export const linkedinUrl =
  'https://www.linkedin.com/in/sergei-fediukov-25b035137/';
