import {Level} from './enums/level.model';
import {IProduct} from './product.model';
import {Moment} from 'moment';
import {IProjectItem} from './project-item.model';

export interface IProductPrice {
  id?: number;
  level?: Level;
  name?: string;
  description?: string | null;
  price?: number | null;
  isActive?: boolean | null;
  createdAt?: Moment | null;
  updatedAt?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  projects?: IProjectItem[] | null;
  products?: IProduct | null;
}

export class ProductPrice implements IProductPrice {
  constructor(
    public id?: number,
    public level?: Level,
    public name?: string,
    public description?: string | null,
    public price?: number | null,
    public isActive?: boolean | null,
    public createdAt?: Moment | null,
    public updatedAt?: Moment | null,
    public createdBy?: string | null,
    public updatedBy?: string | null,
    public projects?: IProjectItem[] | null,
    public products?: IProduct | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getProductPriceIdentifier(productPrice: IProductPrice): number | undefined {
  return productPrice.id;
}
