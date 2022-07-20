import {Authority} from '../constants/authority.constants';
import {Moment} from 'moment';
import * as moment from 'moment';

export interface IUser {
  activated?: boolean | null;
  authorities?: Authority[] | null;
  createdBy?: string | null;
  createdDate?: Moment | null;
  email?: string | null;
  firstName?: string | null;
  id?: number | null;
  imageUrl?: string | null;
  langKey?: string | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: Moment | null;
  lastName?: string | null;
  login?: string | null;
  phoneWhatsapp?: string | null;
}

export class User implements IUser {
  activated: boolean | null;
  authorities: Authority[] | null;
  createdBy: string | null;
  createdDate: moment.Moment | null;
  email: string | null;
  firstName: string | null;
  id: number | null;
  imageUrl: string | null;
  langKey: string | null;
  lastModifiedBy: string | null;
  lastModifiedDate: moment.Moment | null;
  lastName: string | null;
  login: string | null;
  phoneWhatsapp: string | null;

  constructor(user: any = {}) {
    user = user ?? {};
    this.activated = user.activated;
    this.authorities = user.authorities;
    this.createdBy = user.createdBy;
    this.createdDate = user.createdDate ? moment(user.createdDate) : null;
    this.email = user.email;
    this.firstName = user.firstName;
    this.id = user.id;
    this.imageUrl = user.imageUrl;
    this.langKey = user.langKey;
    this.lastModifiedBy = user.lastModifiedBy;
    this.lastModifiedDate = user.lastModifiedDate ? moment(user.lastModifiedDate) : null;
    this.lastName = user.lastName;
    this.login = user.login;
    this.phoneWhatsapp = user.phoneWhatsapp;
  }

}
