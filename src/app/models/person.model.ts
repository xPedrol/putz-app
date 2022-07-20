import {Moment} from 'moment';
import {IPortfolio} from './portfolio.model';
import {IProjectItemRequest} from './project-item-request.model';
import {IProjectItem} from './project-item.model';
import {IProject} from './environment.model';
import {IUserBasic} from './basics/user-basic.model';
import {PersonType} from './enums/person-type.model';
import {Gender} from './enums/gender-type.model';
import * as moment from 'moment';
import {IPersonBasic} from './basics/person.basic';
import {PersonReference} from '../constants/person-reference.constants';
import {IPhoneDetail} from "./phone-detail.model";


export interface IPerson {
  id?: number;
  slug?: string;
  name?: string;
  nameFantasy?: string | null;
  cpfCNPF?: string | null;
  rgDoc?: string | null;
  birthday?: Moment | null;
  lastaccess?: Moment | null;
  avatarContentType?: string | null;
  avatar?: string | null;
  personType?: PersonType | null;
  gender?: Gender | null;
  email?: string | null;
  phone?: string | null;
  phoneCel?: string | null;
  phoneWhatsapp?: string | null;
  addressZipCode?: string | null;
  addressLocation?: string | null;
  addressNumber?: string | null;
  addressComplement?: string | null;
  addressDistrict?: string | null;
  addressCity?: string | null;
  addressUf?: string | null;
  addressCountry?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  user?: IUserBasic | null;
  funcionarios?: IPerson[] | null;
  portfolios?: IPortfolio[] | null;
  requests?: IProjectItemRequest[] | null;
  jogs?: IProjectItem[] | null;
  agencyProjects?: IProject[] | null;
  projects?: IProject[] | null;
  managerProjects?: IProject[] | null;
  vendorProjects?: IProject[] | null;
  clientProjects?: IProject[] | null;
  company?: IPersonBasic | null;
  reference?: PersonReference | null;
  phoneWhatsappVerification?: string | null;
  phoneWhatsappDetail?: IPhoneDetail | null;
}

export class Person implements IPerson {
  public id?: number;
  public slug?: string;
  public name?: string;
  public nameFantasy?: string | null;
  public cpfCNPF?: string | null;
  public rgDoc?: string | null;
  public birthday?: Moment | null;
  public lastaccess?: Moment | null;
  public avatarContentType?: string | null;
  public avatar?: string | null;
  public personType?: PersonType | null;
  public gender?: Gender | null;
  public email?: string | null;
  public phone?: string | null;
  public phoneCel?: string | null;
  public phoneWhatsapp?: string | null;
  public addressZipCode?: string | null;
  public addressLocation?: string | null;
  public addressNumber?: string | null;
  public addressComplement?: string | null;
  public addressDistrict?: string | null;
  public addressCity?: string | null;
  public addressUf?: string | null;
  public addressCountry?: string | null;
  public isActive?: boolean | null;
  public createdDate?: Moment | null;
  public lastModifiedDate?: Moment | null;
  public createdBy?: string | null;
  public updatedBy?: string | null;
  public user?: IUserBasic | null;
  public funcionarios?: IPerson[] | null;
  public portfolios?: IPortfolio[] | null;
  public requests?: IProjectItemRequest[] | null;
  public jogs?: IProjectItem[] | null;
  public agencyProjects?: IProject[] | null;
  public projects?: IProject[] | null;
  public managerProjects?: IProject[] | null;
  public vendorProjects?: IProject[] | null;
  public clientProjects?: IProject[] | null;
  public company?: IPersonBasic | null;
  public reference?: PersonReference | null;
  public phoneWhatsappVerification?: string | null;
  public phoneWhatsappDetail?: IPhoneDetail | null;

  constructor(person: any = null) {
    person = person ?? {};
    this.id = person?.id;
    this.name = person?.name;
    this.slug = person?.slug;
    this.nameFantasy = person?.nameFantasy;
    this.cpfCNPF = person?.cpfCNPF;
    this.rgDoc = person?.rgDoc;
    this.birthday = person?.birthday ? moment(person?.birthday) : null;
    this.lastaccess = person?.lastaccess ? moment(person?.lastaccess) : null;
    this.avatarContentType = person?.avatarContentType;
    this.avatar = person?.avatar;
    this.personType = person?.personType;
    this.gender = person?.gender;
    this.email = person?.email;
    this.phone = person?.phone;
    this.phoneCel = person?.phoneCel;
    this.phoneWhatsapp = person?.phoneWhatsapp;
    this.addressZipCode = person?.addressZipCode;
    this.addressLocation = person?.addressLocation;
    this.addressNumber = person?.addressNumber;
    this.addressComplement = person?.addressComplement;
    this.addressDistrict = person?.addressDistrict;
    this.addressCity = person?.addressCity;
    this.addressUf = person?.addressUf;
    this.addressCountry = person?.addressCountry;
    this.createdDate = person?.createdDate ? moment(person?.createdDate) : null;
    this.lastModifiedDate = person?.lastModifiedDate ? moment(person?.lastModifiedDate) : null;
    this.createdBy = person?.createdBy;
    this.updatedBy = person?.updatedBy;
    this.user = person?.user;
    this.funcionarios = person?.funcionarios;
    this.portfolios = person?.portfolios;
    this.requests = person?.requests;
    this.jogs = person?.jogs;
    this.agencyProjects = person?.agencyProjects;
    this.projects = person?.projects;
    this.managerProjects = person?.managerProjects;
    this.vendorProjects = person?.vendorProjects;
    this.clientProjects = person?.clientProjects;
    this.company = person?.company;
    this.isActive = this.isActive ?? false;
    this.reference = person?.reference;
    this.phoneWhatsappVerification = person?.phoneWhatsappVerification;
    this.phoneWhatsappDetail = person?.phoneWhatsappDetail;
  }

}

export function getPersonIdentifier(person: IPerson): number | undefined {
  return person.id;
}
