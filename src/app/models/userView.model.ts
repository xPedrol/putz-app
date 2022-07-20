import {IProfile, Profile} from './profile.model';
import {Authority} from '../constants/authority.constants';

export interface IUserView {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  profile: IProfile | null;
  fullName: string;
  fullContact: string;
  authorities: Authority[];

  getAuthorities(): string;
}

export class UserView implements IUserView {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  profile: IProfile | null;
  fullName: string;
  fullContact: string;
  authorities: Authority[];

  constructor(id: number, firstName: string, lastName: string, email: string, imageUrl: string, profile: IProfile, authorities: Authority[], IMAGES_URL: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.authorities = authorities;
    this.imageUrl = IMAGES_URL + imageUrl;
    this.profile = profile ? new Profile(profile) : null;
    if (this.firstName || this.lastName) {
      this.fullName = `${(this.firstName ? this.firstName : '')} ${(this.lastName ? this.lastName : '')}`;
    } else {
      this.fullName = '';
    }
    this.fullContact = `${(this.email ? `${this.email}\n` : '')}` + `${(this.profile?.mobileNumber ? `${this.profile?.mobileNumber}\n` : '')}`;
  }

  getAuthorities(): string {
    const authorities = [];
    if (this.authorities.includes(Authority.FREELANCER)) {
      authorities.push('freelancer');
    }
    if (this.authorities.includes(Authority.CLIENT)) {
      authorities.push('cliente');
    }
    if (this.authorities.includes(Authority.ADMIN)) {
      authorities.push('administrador');
    }
    let authoritiesString = '';
    authorities.forEach((authority, i) => {
      if (i === 0) {
        authoritiesString += authority;
      } else {
        authoritiesString += `, ${authority}`;
      }
    });
    return authoritiesString;
  }
}
