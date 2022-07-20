import * as moment from 'moment';
import {Moment} from 'moment';
import {IPerson} from './person.model';
import {IProjectItemRequest} from './project-item-request.model';
import {IProjectStep} from './project-step.model';
import {IProject} from './project.model';
import {ITimeLineEvent} from './time-line-event.model';
import {IProduct, Product} from './product.model';

export interface IProjectItem {
  id?: number;
  name?: string | null;
  itemIndex?: number;
  isChecked?: boolean | null;
  isOpportunity?: boolean | null;
  isClosed?: boolean | null;
  isActive?: boolean | null;
  value?: number;
  valueBase?: number;
  valueDiference?: number;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  closeDate?: Moment | null;
  closeDateDisplayed?: string | null;
  startDate?: Moment | null;
  expectedDate?: Moment | null;
  endDate?: Moment | null;
  customerRate?: number | null;
  managerRate?: number | null;
  managerComment?: string | null;
  createdAt?: Moment | null;
  updatedAt?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  requests?: IProjectItemRequest[] | null;
  freelancer?: IPerson | null;
  project?: IProject | null;
  projectName?: string | null | undefined;
  projectId?: number | undefined;
  description?: string | null;
  projectStep?: IProjectStep | null;
  events?: ITimeLineEvent[] | null;
  product?: IProduct | null;
  quantity?: number | null;
  isExtraItem?: boolean | null;
  invoicePDF?: string | null;
}

export class ProjectItem implements IProjectItem {
  closeDate: Moment | null;
  createdAt: Moment | null;
  createdBy: string | null;
  createdDate: Moment | null;
  customerRate: number | null;
  endDate: Moment | null;
  expectedDate: Moment | null;
  freelancer: IPerson | null;
  id: number;
  isActive: boolean | null;
  isChecked: boolean | null;
  isClosed: boolean | null;
  isOpportunity: boolean | null;
  itemIndex: number;
  lastModifiedDate: Moment | null;
  managerComment: string | null;
  managerRate: number | null;
  name: string | null;
  project: IProject | null;
  projectName: string | null | undefined;
  projectId: number;
  requests: IProjectItemRequest[] | null;
  startDate: Moment | null;
  updatedAt: Moment | null;
  updatedBy: string | null;
  description: string | null;
  projectStep: IProjectStep | null;
  value: number;
  valueBase?: number;
  valueDiference?: number;
  events: ITimeLineEvent[] | null;
  product: IProduct | null;
  quantity: number | null;
  isExtraItem: boolean | null;
  invoicePDF: string | null;

  constructor(item: any) {
    item = item || {};
    this.closeDate = item?.closeDate ? moment(item?.closeDate) : null;
    this.createdAt = item?.createdAt;
    this.createdBy = item?.createdBy;
    this.createdDate = item?.createdDate ? moment(item?.createdDate) : null;
    this.customerRate = item?.customerRate;
    this.endDate = item?.endDate;
    this.expectedDate = item?.expectedDate ? moment(item?.expectedDate) : null;
    this.freelancer = item?.freelancer;
    this.id = item?.id;
    this.isActive = item?.isActive ?? false;
    this.isChecked = item?.isChecked ?? false;
    this.isClosed = item?.isClosed ?? false;
    this.itemIndex = item?.itemIndex;
    this.lastModifiedDate = item?.lastModifiedDate ? moment(item?.lastModifiedDate) : null;
    this.managerComment = item?.managerComment;
    this.managerRate = item?.managerRate;
    this.name = item?.name;
    this.project = item?.project;
    this.projectName = item?.project?.name ?? undefined;
    if (!this.projectName) {
      this.projectName = item?.projectName;
    }
    this.projectId = item?.project?.id ?? undefined;
    this.requests = item?.requests;
    this.startDate = item?.startDate;
    this.updatedAt = item?.updatedAt;
    this.updatedBy = item?.updatedBy;
    this.value = item?.value;
    this.description = item?.description;
    this.projectStep = item?.projectStep;
    this.events = item?.events;
    this.product = new Product(item?.product);
    this.valueBase = this.product?.price ?? 0;
    this.valueDiference = this.value - this.valueBase;
    this.isOpportunity = item?.isOpportunity;
    this.quantity = item?.quantity;
    this.isExtraItem = item?.isExtraItem;
    this.invoicePDF = item?.invoicePDF;
  }

  static clearFieldsForUpdate(items: IProjectItem[] | undefined | null): IProjectItem[] {
    if (items) {
      return items.map(item => {
        // item.id = undefined;
        item.product = {id: item.product?.id, level: item.product!.level};
        item.freelancer = {id: item.freelancer?.id};
        item.startDate = undefined;
        item.closeDate = undefined;
        item.endDate = undefined;
        item.createdDate = undefined;
        item.lastModifiedDate = undefined;
        item.expectedDate = undefined;
        return item;
      });
    }
    return [];
  }

}

export function getProjectItemIdentifier(projectItem: IProjectItem): number | undefined {
  return projectItem.id;
}
