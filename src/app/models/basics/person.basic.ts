export interface IPersonBasic {
  id?: number | null;
  name?: string | null;
  avatar?: string | null;
  companyName?: string | null;
  slug?: string | null;
}

export class PersonBasic implements IPersonBasic {
  avatar: string | null;
  companyName: string | null;
  id: number | null;
  name: string | null;
  slug: string | null;

  constructor(personBasic: IPersonBasic | any = {}) {
    this.avatar = personBasic.avatar;
    this.companyName = personBasic.companyName;
    this.id = personBasic.id;
    this.name = personBasic.name;
    this.slug = personBasic.slug;
  }


}
