import {NbAuthJWTToken} from '@nebular/auth';
import {environment} from '../../../environments/environment';

export const MainStrategy = {
  name: 'main',
  token: {
    class: NbAuthJWTToken,
    key: 'id_token'
  },
  baseEndpoint: environment.API_URL,
  login: {
    endpoint: 'authenticate',
    method: 'post',
    redirect: {
      success: '/dashboard',
      failure: null, // stay on the same page
    },
  },
  register: {
    endpoint: 'register',
    method: 'post',
    redirect: {
      success: '/dashboard',
      failure: null, // stay on the same page
    },
  },
};
