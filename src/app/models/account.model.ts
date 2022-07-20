import {Authority} from '../constants/authority.constants';

export interface IAccount {
  id: number;
  activated?: boolean;
  authorities?: Authority[];
  email?: string;
  firstName: string;
  langKey: string;
  lastName: string;
  login?: string;
  imageUrl?: string;

  get isClient(): boolean;

  get isAgency(): boolean;

  get isAdmin(): boolean;

  get isVendor(): boolean;

  get isFreelancer(): boolean;

  get isManager(): boolean;

  hasAnyAuthority(authorities: Authority[]): boolean;

  notHasAnyAuthority(authorities: Authority[]): boolean;

  isAValidAccount(): boolean;

  hasOnlyAuthority(authorities: Authority[]): boolean;
  hasHighAuthority(): boolean;
}

export class Account {
  id: number;
  activated: boolean;
  authorities: Authority[];
  email: string;
  firstName: string;
  langKey: string;
  lastName: string;
  login: string;
  imageUrl: string;

  constructor(account?: any) {
    // account = account ? account : {};
    this.id = account?.id;
    this.authorities = account?.authorities;
    this.email = account?.email;
    this.login = account?.login;
    this.imageUrl = account?.imageUrl;
    this.activated = account?.activated;
    this.langKey = account?.langKey;
    this.lastName = account?.lastName;
    this.firstName = account?.firstName;
  }

  get isClient(): boolean {
    if (this) {
      return this.authorities.includes(Authority.CLIENT);
    }
    return false;
  }

  get isAdmin(): boolean {
    if (this) {
      return this.authorities.includes(Authority.ADMIN);
    }
    return false;
  }

  get isFreelancer(): boolean {
    if (this) {
      return this.authorities.includes(Authority.FREELANCER);
    }
    return false;
  }

  get isAgency(): boolean {
    if (this) {
      return this.authorities.includes(Authority.AGENCY);
    }
    return false;
  }

  get isVendor(): boolean {
    if (this) {
      return this.authorities.includes(Authority.VENDOR);
    }
    return false;
  }

  get isManager(): boolean {
    if (this) {
      return this.authorities.includes(Authority.MANAGER);
    }
    return false;
  }

  hasAnyAuthority(authorities: Authority[]): boolean {
    if (authorities && authorities.length > 0) {
      if (this.authorities && this.authorities?.length > 0) {
        return this.authorities.some((authority) => {
          return authorities.includes(authority);
        });
      } else {
        return false;
      }
    }
    return true;
  }

  isAValidAccount(): boolean {
    let valid = true;
    if (!this.id) {
      valid = false;
    }
    if (!this.authorities || this.authorities.length === 0) {
      valid = false;
    }
    if (!this.login) {
      valid = false;
    }
    return valid;
  }

  hasOnlyAuthority(authorities: Authority[]): boolean {
    if (authorities === this.authorities) {
      return true;
    }
    if (authorities && this.authorities) {
      for (const authority of this.authorities) {
        if (!authorities.includes(authority)) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  notHasAnyAuthority(authorities: Authority[]): boolean {
    if (authorities && authorities.length > 0) {
      if (this.authorities && this.authorities?.length > 0) {
        for (const authority of this.authorities) {
          if (authorities.includes(authority)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  hasHighAuthority(): boolean {
    return this.hasAnyAuthority([Authority.ADMIN, Authority.MANAGER]);
  }

}
