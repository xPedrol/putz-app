import {Authority} from '../constants/authority.constants';

export interface IUserAuth {
  password: string;
  login: string;
  email?: string;
  agreeTerms?: boolean;
  username?: string;
  authorities?: Authority[];
  rememberMe?: boolean;
}

export class UserAuth implements IUserAuth {
  password!: string;
  login!: string;
  email?: string;
  agreeTerms?: boolean;
  username?: string;
  authorities?: Authority[];
  ememberMe?: boolean;
}
