import {Moment} from 'moment';
import {IProject} from './project.model';
import {PaymentType} from './enums/payment-type.model';


export interface IProjectPayment {
  id?: number;
  description?: string | null;
  isActive?: boolean | null;
  itemIndex?: number;
  paymentDate?: Moment | null;
  paymentValue?: number | null;
  paymentType?: PaymentType | null;
  isChecke?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  project?: IProject | null;
}

export class ProjectPayment implements IProjectPayment {
  constructor(
    public id?: number,
    public description?: string | null,
    public isActive?: boolean | null,
    public itemIndex?: number,
    public paymentDate?: Moment | null,
    public paymentValue?: number | null,
    public paymentType?: PaymentType | null,
    public isChecke?: boolean | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public project?: IProject | null
  ) {
    this.isActive = this.isActive ?? false;
    this.isChecke = this.isChecke ?? false;
  }
}

export function getProjectPaymentIdentifier(projectPayment: IProjectPayment): number | undefined {
  return projectPayment.id;
}
