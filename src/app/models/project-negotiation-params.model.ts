import {InsuranceType} from './enums/project-insurance-type.model';
import {PaymentType} from './enums/payment-type.model';
import {ProjectPriorityType} from './enums/project-priority-type.model';
import {IProjectItem} from './project-item.model';

export interface IProjectNegotiationParams {
  agencyCommissionPercent: number | null;
  commissionPercent: number | null;
  itemsBaseSum: number | null;

  finalExtraBudget: number | null;
  finalPrice: number | null;
  insurancePercent: number | null;

  insuranceType: InsuranceType | string;
  itemsSum: number | null;
  negotiationRebatePercent: number | null;

  paymentFactorPercent: number | null;

  paymentType: PaymentType | string;
  priorityPercent: number | null;

  priorityType: ProjectPriorityType | string;
  profitFinalPercent: number | null;
  profitTargetPercent: number | null;
  quantity: number | null;

  rebateCreditsPercent: number | boolean | null;

  rebateSubscriberPercent: number | null;

  rebateSubscriberPlan: number | null;


  rebateSubscriberTime: number | null;

  rebateWatermarkPercent: number | boolean | null;

  tributePercent: number | null;

  videoTime: number | null;

  items?: IProjectItem[] | null;
}

export class ProjectNegotiationParams implements IProjectNegotiationParams {
  agencyCommissionPercent: number | null;
  commissionPercent: number | null;
  finalExtraBudget: number | null;
  finalPrice: number | null;
  insurancePercent: number | null;
  insuranceType: InsuranceType | string;
  itemsSum: number | null;
  negotiationRebatePercent: number | null;
  paymentFactorPercent: number | null;
  paymentType: PaymentType | string;
  priorityPercent: number | null;
  priorityType: ProjectPriorityType | string;
  profitFinalPercent: number | null;
  profitTargetPercent: number | null;
  quantity: number | null;
  rebateCreditsPercent: number | boolean | null;
  rebateSubscriberPercent: number | null;
  rebateSubscriberPlan: number | null;
  rebateSubscriberTime: number | null;
  rebateWatermarkPercent: number | boolean | null;
  tributePercent: number | null;
  videoTime: number | null;
  items?: IProjectItem[] | null;
  itemsBaseSum: number | null;

  constructor(params: any = {}) {
    params = params ?? {};
    this.agencyCommissionPercent = params.agencyCommissionPercent;
    this.commissionPercent = params.commissionPercent;
    this.finalExtraBudget = params.finalExtraBudget;
    this.finalPrice = params.finalPrice;
    this.insurancePercent = params.insurancePercent;
    this.insuranceType = params.insuranceType;
    this.itemsSum = params.itemsSum;
    this.negotiationRebatePercent = params.negotiationRebatePercent;
    this.paymentFactorPercent = params.paymentFactorPercent;
    this.paymentType = params.paymentType;
    this.priorityPercent = params.priorityPercent;
    this.priorityType = params.priorityType;
    this.profitFinalPercent = params.profitFinalPercent;
    this.profitTargetPercent = params.profitTargetPercent;
    this.quantity = params.quantity;
    this.rebateCreditsPercent = params.rebateCreditsPercent;
    this.rebateSubscriberPercent = params.rebateSubscriberPercent;
    this.rebateSubscriberPlan = params.rebateSubscriberPlan;
    this.rebateSubscriberTime = params.rebateSubscriberTime;
    this.rebateWatermarkPercent = params.rebateWatermarkPercent;
    this.tributePercent = params.tributePercent;
    this.videoTime = params.videoTime;
    this.itemsBaseSum = params.itemsBaseSum;
// }
  }

}
