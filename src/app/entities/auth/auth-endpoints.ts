const authEndpoints = {
  baseEndpoint: 'http://example.com/app-api/v1',
  login: {
    endpoint: '/auth/sign-in',
    method: 'post',
  },
  register: {
    endpoint: '/auth/sign-up',
    method: 'post',
  },
  logout: {
    endpoint: '/auth/sign-out',
    method: 'post',
  },
  requestPass: {
    endpoint: '/auth/request-pass',
    method: 'post',
  },
  resetPass: {
    endpoint: '/auth/reset-pass',
    method: 'post',
  },
};
