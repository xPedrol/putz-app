import * as moment from 'moment';
import {Moment} from 'moment';
import {IProductType} from './product-type.model';
import {Level} from './enums/level.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  price?: number | null;
  productType?: IProductType | number;
  level?: Level | null;

}

export class Product implements IProduct {
  createdBy: string | null;
  createdDate: moment.Moment | null;
  description: string | null;
  id: number;
  isActive: boolean | null;
  lastModifiedDate: moment.Moment | null;
  level: Level | null;
  name: string;
  price: number | null;
  productType: IProductType | number;
  lastModifiedBy: string | null;

  constructor(product: any = {}) {
    product = product ?? {};
    this.createdBy = product.createdBy;
    this.createdDate = product.createdDate ? moment(product.createdDate) : null;
    this.description = product.description;
    this.id = product.id;
    this.isActive = product.isActive;
    this.lastModifiedDate = product.lastModifiedDate ? moment(product.lastModifiedDate) : null;
    this.level = product.level;
    this.name = product.name;
    this.price = product.price;
    this.productType = product.productType;
    this.lastModifiedBy = product.lastModifiedBy;
  }

}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
