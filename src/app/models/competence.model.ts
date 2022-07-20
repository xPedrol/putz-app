import {IProductCompetence} from './product-competence.model';
import {IPortfolio} from './portfolio.model';
import * as moment from 'moment';
import {Moment} from 'moment';

export interface ICompetence {
  id?: number;
  name?: string;
  description?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  products?: IProductCompetence[] | null;
  portifilios?: IPortfolio[] | null;
}

export class Competence implements ICompetence {
  createdBy: string | null;
  createdDate: Moment | null;
  description: string | null;
  id: number;
  isActive: boolean | null;
  lastModifiedDate: Moment | null;
  name: string;
  portifilios: IPortfolio[] | null;
  products: IProductCompetence[] | null;
  lastModifiedBy: string | null;

  constructor(competence: any) {
    competence = competence ?? {};
    this.createdBy = competence.createdBy;
    this.createdDate = competence.createdDate ? moment(competence.createdDate) : null;
    this.description = competence.description;
    this.id = competence.id;
    this.isActive = competence.isActive;
    this.lastModifiedDate = competence.lastModifiedDate ? moment(competence.lastModifiedDate) : null;
    this.name = competence.name;
    this.portifilios = competence.portifilios;
    this.products = competence.products;
    this.lastModifiedBy = competence.lastModifiedBy;
  }
}

export function getCompetenceIdentifier(competence: ICompetence): number | undefined {
  return competence.id;
}
