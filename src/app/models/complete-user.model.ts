import {Moment} from 'moment';
import {IProfile} from './profile.model';
import {Authority} from '../constants/authority.constants';
import {IUserView, UserView} from './userView.model';


export interface ICompleteUser extends IUserView {
  login: string;
  emailVerifiedAt: Moment;
  passwordHash: string;
  lastAccess: Moment;
  firstAccess: Moment;
  activated: boolean;
  agreeTerms: boolean;
  rememberToken: string;
  langKey: string;
  activationKey: string;
  resetDate: Moment;
  lastIpAddress: string;
  createdBy: string;
  createdDate: Moment;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  importado: string;
  idusermaratona: number;
  idteammaratona: number;
  authorities: Authority[];
}

export class CompleteUser extends UserView implements ICompleteUser {
  activated: boolean;
  activationKey: string;
  agreeTerms: boolean;
  createdBy: string;
  createdDate: Moment;
  emailVerifiedAt: Moment;
  firstAccess: Moment;
  idteammaratona: number;
  idusermaratona: number;
  importado: string;
  langKey: string;
  lastAccess: Moment;
  lastIpAddress: string;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  login: string;
  passwordHash: string;
  profile!: IProfile;
  rememberToken: string;
  resetDate: Moment;


  constructor(user?: any, IMAGES_URL?: string) {
    IMAGES_URL = IMAGES_URL ? IMAGES_URL : '';
    super(user?.id, user?.firstName, user?.lastName, user?.email, user?.imageUrl, user?.profile, user?.authorities, IMAGES_URL);
    this.activated = user?.activated;
    this.activationKey = user?.activationKey;
    this.agreeTerms = user?.agreeTerms;
    this.createdBy = user?.createdBy;
    this.createdDate = user?.createdDate;
    this.emailVerifiedAt = user?.emailVerifiedAt;
    this.firstAccess = user?.firstAccess;
    this.idteammaratona = user?.idteammaratona;
    this.idusermaratona = user?.idusermaratona;
    this.importado = user?.importado;
    this.langKey = user?.langKey;
    this.lastAccess = user?.lastAccess;
    this.lastIpAddress = user?.lastIpAddress;
    this.lastModifiedBy = user?.lastModifiedBy;
    this.lastModifiedDate = user?.lastModifiedDate;
    this.login = user?.login;
    this.passwordHash = user?.passwordHash;
    this.rememberToken = user?.rememberToken;
    this.resetDate = user?.resetDate;
  }

}
