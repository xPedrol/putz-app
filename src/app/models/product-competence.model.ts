import {IProduct} from './product.model';
import {Moment} from 'moment';
import {ICompetence} from './competence.model';

export interface IProductCompetence {
  id?: number;
  isActive?: boolean | null;
  createdAt?: Moment | null;
  updatedAt?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  product?: IProduct | null;
  competence?: ICompetence | null;
}

export class ProductCompetence implements IProductCompetence {
  constructor(
    public id?: number,
    public isActive?: boolean | null,
    public createdAt?: Moment | null,
    public updatedAt?: Moment | null,
    public createdBy?: string | null,
    public updatedBy?: string | null,
    public product?: IProduct | null,
    public competence?: ICompetence | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getProductCompetenceIdentifier(productCompetence: IProductCompetence): number | undefined {
  return productCompetence.id;
}
