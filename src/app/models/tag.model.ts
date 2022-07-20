import {IPortfolio} from './portfolio.model';
import {IProject} from './environment.model';
import {IProduct} from './product.model';
import * as moment from 'moment';
import {Moment} from 'moment';

export interface ITag {
  id?: number;
  name?: string;
  description?: string | null;
  products?: IProduct[] | null;
  projects?: IProject[] | null;
  portfolios?: IPortfolio[] | null;

  isActive?: boolean | null;
  createdBy?: string | null;
  createdDate?: Moment | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: Moment | null;
}

export class Tag implements ITag {
  description: string | null;
  id: number;
  name: string;
  portfolios: IPortfolio[] | null;
  products: IProduct[] | null;
  projects: IProject[] | null;

  isActive: boolean | null;
  createdBy: string | null;
  createdDate: Moment | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;

  constructor(tag: any = null) {
    tag = tag ?? {};
    this.id = tag.id;
    this.name = tag.name;
    this.description = tag.description;
    this.portfolios = tag.portifolios;
    this.products = tag.products;
    this.projects = tag.projects;

    this.isActive = tag.isActive ?? false;
    this.createdBy = tag.createdBy;
    this.createdDate = tag.createdDate ? moment(tag.createdDate) : null;
    this.lastModifiedBy = tag.lastModifiedBy;
    this.lastModifiedDate = tag.lastModifiedDate ? moment(tag.lastModifiedDate) : null;
  }

}

export function getTagIdentifier(tag: ITag): number | undefined {
  return tag.id;
}
