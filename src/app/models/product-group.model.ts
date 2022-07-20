import {Moment} from 'moment';
import {IProduct} from './product.model';


export interface IProductGroup {
  id?: number;
  name?: string;
  description?: string | null;
  isActive?: boolean | null;
  createdAt?: Moment | null;
  updatedAt?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  products?: IProduct[] | null;
}

export class ProductGroup implements IProductGroup {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public isActive?: boolean | null,
    public createdAt?: Moment | null,
    public updatedAt?: Moment | null,
    public createdBy?: string | null,
    public updatedBy?: string | null,
    public products?: IProduct[] | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getProductGroupIdentifier(productGroup: IProductGroup): number | undefined {
  return productGroup.id;
}
