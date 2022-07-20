import {Moment} from 'moment';
import {IProject} from './project.model';
import {PaymentType} from './enums/payment-type.model';
import {PaymentPlanType} from './enums/payment-plan-type.model';

export interface IPaymentPlan {
  id?: number;
  name?: string;
  description?: string | null;
  isActive?: boolean | null;
  paymentPlanType?: PaymentPlanType | null;
  paymentType?: PaymentType | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  projects?: IProject[] | null;
}

export class PaymentPlan implements IPaymentPlan {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public isActive?: boolean | null,
    public paymentPlanType?: PaymentPlanType | null,
    public paymentType?: PaymentType | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public projects?: IProject[] | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getPaymentPlanIdentifier(paymentPlan: IPaymentPlan): number | undefined {
  return paymentPlan.id;
}
