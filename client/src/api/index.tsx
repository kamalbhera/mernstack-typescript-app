let baseUrl;

// export const proxyUrl = 'https://express-questionnaires-server.herokuapp.com';
export const proxyUrl = 'https://questionnaires-server.onrender.com'


if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
}
if (process.env.NODE_ENV === 'production') {
  baseUrl = `${proxyUrl}/api`;
}

export const PATHS = {
  login: `${baseUrl}/auth/login`,
  signup: `${baseUrl}/auth/signup`,
  refresh: `${baseUrl}/auth/refresh`,
  poll: `${baseUrl}/poll`,
  template: `${baseUrl}/template`,
  user: `${baseUrl}/auth/getAllUsers`,
  result: `${baseUrl}/result`,
  statistic: `${baseUrl}/result/statistic`,
};
