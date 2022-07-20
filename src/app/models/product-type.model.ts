import {Moment} from 'moment';
import {ITag} from './tag.model';
import {IProductGroup} from './product-group.model';
import {IProduct} from "./product.model";
import * as moment from "moment";

export interface IProductType {
  id?: number;
  name?: string;
  description?: string | null;
  unit?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  tags?: ITag[] | null;
  groups?: IProductGroup[] | null;
}

export class ProductType implements IProductType {
  createdBy: string | null;
  createdDate: Moment | null;
  description: string | null;
  groups: IProductGroup[] | null;
  id: number;
  isActive: boolean | null;
  lastModifiedDate: Moment | null;
  name: string;
  tags: ITag[] | null;
  unit: string | null;
  updatedBy: string | null;

  constructor(productType: any = {}) {
    this.createdBy = productType.createdBy;
    this.createdDate = productType.createdDate ? moment(productType.createdDate) : null;
    this.description = productType.description;
    this.groups = productType.groups;
    this.id = productType.id;
    this.isActive = productType.isActive;
    this.lastModifiedDate = productType.lastModifiedDate ? moment(productType.lastModifiedDate) : null;
    this.name = productType.name;
    this.tags = productType.tags;
    this.unit = productType.unit;
    this.updatedBy = productType.updatedBy;
  }

}

export function getProductTypeIdentifier(productType: IProductType): number | undefined {
  return productType.id;
}
