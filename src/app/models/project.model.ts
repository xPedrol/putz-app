import * as moment from 'moment';
import {Moment} from 'moment';
import {IProjectItem} from './project-item.model';
import {ITag} from './tag.model';
import {IProjectStep, ProjectStep} from './project-step.model';
import {IProjectBasic, ProjectBasic} from './basics/project-basic.model';
import {IPersonBasic} from './basics/person.basic';
import {IProjectNegotiationParams, ProjectNegotiationParams} from './project-negotiation-params.model';
import {IProjectNegotiationCalcs} from './project-negotiation-calcs.model';
import {ProjectStatus} from './enums/project-status.model';

export interface IProject extends IProjectBasic {
  agreementPdfLink?: string | null;
  agency?: IPersonBasic | null;
  approvedDateByClient?: Moment | null;
  approvedDateByPutz?: Moment | null;
  cancelUser?: IPersonBasic | null;
  canceledDate?: Moment | null;
  changeMaxNumber?: number | null;
  client?: IPersonBasic | null;
  createdBy?: string | null;
  createdDate?: Moment | null;
  days?: number | null;
  description?: string | null;
  difficultyLevel?: number | null;
  endDate?: Moment | null;
  finalExtraBudget?: number | null;
  insurancePercent?: number | null;
  items?: IProjectItem[] | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: Moment | null;
  manager?: IPersonBasic | null;
  negotiationCalc?: IProjectNegotiationCalcs | null;
  negotiation?: IProjectNegotiationParams | null;
  priorityPercent?: number | null;
  projectRenderId?: number | null;
  projectRenderSlug?: string | null;
  projectSteps?: IProjectStep[] | null;
  rootProjectId?: number | null;
  rootProjectName?: string | null;
  startDate?: Moment | null;
  tags?: ITag[] | null;
  vendor?: IPersonBasic | null;
  videoUrlHiRes?: string | null;
  videoUrlLowRes?: string | null;
  modelForConception?: boolean | null;
  agencyMaxCommission?: number;
  anyApproved?: boolean | null;
  tributeAncine?: number | null;
  canEdit?: boolean | null;
  canClose?: boolean | null;

  get priceWithInsurance(): number;

  get totalPrice(): number;

  get totalPriceString(): string;

  calcItemSum(items?: IProjectItem[] | null): number;

  clearFields(): void;

  verifyCanEdit(): void;

  verifyCanClose(): void;

}

export class Project extends ProjectBasic implements IProject {
  agreementPdfLink: string | null;
  agency: IPersonBasic | null;
  approvedDateByClient: Moment | null;
  approvedDateByPutz: Moment | null;
  cancelUser: IPersonBasic | null;
  canceledDate: Moment | null;
  changeMaxNumber: number | null;
  client: IPersonBasic | null;
  createdBy: string | null;
  createdDate: Moment | null;
  days: number | null;
  description: string | null;
  difficultyLevel: number | null;
  endDate: Moment | null;
  finalExtraBudget: number | null;
  insurancePercent: number | null;
  items: IProjectItem[] | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  manager: IPersonBasic | null;
  negotiationCalc: IProjectNegotiationCalcs | null;
  negotiation: IProjectNegotiationParams | null;
  priorityPercent: number | null;
  projectRenderId: number | null;
  projectRenderSlug: string | null;
  projectSteps: IProjectStep[] | null;
  rootProjectId: number | null;
  rootProjectName: string | null;
  startDate: Moment | null;
  tags: ITag[] | null;
  vendor: IPersonBasic | null;
  videoUrlHiRes: string | null;
  videoUrlLowRes: string | null;
  modelForConception: boolean | null;
  agencyMaxCommission: number;
  anyApproved?: boolean | null;
  tributeAncine?: number | null;
  canEdit: boolean | null;
  canClose: boolean | null;

  get priceWithInsurance(): number {
    const price = this.totalPrice;
    if (this.insurancePercent) {
      return price * ((this.insurancePercent / 100) + 1);
    }
    return price;
  }

  get totalPrice(): number {
    let total = 0;
    if (this.items && this.items?.length > 0) {
      this.items.forEach(item => {
        if (item && item.value) {
          total += item.value;
        }
      });
    }
    return 100;
  }

  get totalPriceString(): string {
    let price = this.totalPrice.toString();
    price = price.replace('.', ',');
    return price;
  }

  calcItemSum(items?: IProjectItem[] | null): number {
    items = items ?? this.items;
    let sum = 0;
    if (items && items.length > 0) {
      items.forEach(item => {
        if (item && item.value) {
          sum += item.value;
        }
      });
    }
    return sum;
  }

  verifyCanEdit(): void {
    this.canEdit = ((this.projectStatus === ProjectStatus.CONCEPTION || this.projectStatus === ProjectStatus.BRIEFING) &&
      !this.agreementPdfLink
      && !this.approvedDateByClient) || this.modelForConception;
  }

  verifyCanClose(): void {
    this.canClose = (this.projectStatus !== ProjectStatus.CONCEPTION &&
      this.projectStatus !== ProjectStatus.BRIEFING &&
      this.projectStatus !== ProjectStatus.CLOSE &&
      !this.modelForConception
    );
  }

  clearFields(): void {
    this.slug = null;
    if (this.items) {
      this.items = this.items.map(item => {
        item.id = undefined;
        return item;
      });
    }
    if (this.projectSteps) {
      this.projectSteps = this.projectSteps.map(item => {
        item.id = undefined;
        return item;
      });
    }
  }

  constructor(project: any = {}) {
    super(project);
    this.agency = project.agency;
    this.approvedDateByClient = project.approvedDateByClient;
    this.approvedDateByPutz = project.approvedDateByPutz;
    this.cancelUser = project.cancelUser;
    this.canceledDate = project.canceledDate ? moment(project.canceledDate) : null;
    this.changeMaxNumber = project.changeMaxNumber;
    this.client = project.client;
    this.createdBy = project.createdBy;
    this.createdDate = project.createdDate ? moment(project.createdDate) : null;
    this.days = project.days;
    this.description = project.description;
    this.difficultyLevel = project.difficultyLevel;
    this.endDate = project.endDate ? moment(project.endDate) : null;
    this.finalExtraBudget = project.finalExtraBudget;
    this.insurancePercent = project.insurancePercent;
    this.items = project.items;
    this.lastModifiedBy = project.lastModifiedBy;
    this.lastModifiedDate = project.lastModifiedDate ? moment(project.lastModifiedDate) : null;
    this.manager = project.manager;
    this.priorityPercent = project.priorityPercent;
    this.projectRenderId = project.projectRenderId;
    this.projectRenderSlug = project.projectRenderSlug;
    this.agreementPdfLink = (project.agreementPdfLink === 'semcontrato.pdf' || !project.agreementPdfLink) ? null : project.agreementPdfLink;
    if (project.projectSteps && project.projectSteps.length > 0) {
      this.projectSteps = this.projectSteps = project.projectSteps.map(step => {
        return new ProjectStep(step);
      });
    }
    this.rootProjectId = project.rootProjectId;
    this.rootProjectName = project.rootProjectName;
    this.startDate = project.startDate ? moment(project.startDate) : null;
    this.tags = project.tags;
    this.vendor = project.vendor;
    this.videoUrlHiRes = project.videoUrlHiRes;
    this.videoUrlLowRes = project.videoUrlLowRes;
    this.negotiation = new ProjectNegotiationParams(project?.negotiation);
    this.negotiationCalc = project?.negotiationCalc;
    this.modelForConception = false;
    this.agencyMaxCommission = project.agencyMaxCommission ?? 12;
    this.anyApproved = this.approvedByClient || this.approvedByPutz;
    this.tributeAncine = project.tributeAncine;
    this.verifyCanEdit();
    this.verifyCanClose();
  }

}

export function getProjectIdentifier(project: IProject): number | undefined | null {
  return project!.id;
}
