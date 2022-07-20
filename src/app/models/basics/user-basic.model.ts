export interface IUserBasic {
  id: number;
  login: string;
  email: string;
  imageUrl: string | null;
  activated: boolean;
}

export class UserBasic implements IUserBasic {
  activated: boolean;
  email: string;
  id: number;
  imageUrl: string | null;
  login: string;

  constructor(user: any = null) {
    user = user || {};
    this.activated = user!.activated;
    this.email = user!.email;
    this.id = user!.id;
    this.imageUrl = user?.imageUrl ?? null;
    this.login = user!.login;
  }
}
