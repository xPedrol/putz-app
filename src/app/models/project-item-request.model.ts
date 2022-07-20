import * as moment from 'moment';
import {Moment} from 'moment';
import {IPerson} from './person.model';
import {IProjectItem, ProjectItem} from './project-item.model';
import {IProjectStep, ProjectStep} from './project-step.model';
import {IProject, Project} from './project.model';
import {ProjectItemRequestStatus} from './enums/project-item-request-status.model';

export interface IProjectItemRequest {
  id?: number;
  description?: string | null;
  isActive?: boolean | null;
  freelaApproved?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  freelancer?: IPerson | null;
  project?: IProject | null;
  projectItem?: IProjectItem | null;
  projectStep?: IProjectStep | null;
  requestStatus?: ProjectItemRequestStatus;
  isApproved?: boolean;
  isDeclined?: boolean;
  isSubscribed?: boolean;
}

export class ProjectItemRequest implements IProjectItemRequest {
  createdBy: string | null;
  createdDate: Moment | null;
  description: string | null;
  freelaApproved: boolean | null;
  freelancer: IPerson | null;
  id: number;
  isActive: boolean | null;
  lastModifiedDate: Moment | null;
  project: IProject | null;
  projectItem: IProjectItem | null;
  projectStep: IProjectStep | null;
  updatedBy: string | null;
  requestStatus: any | null;
  isApproved: boolean;
  isDeclined: boolean;
  isSubscribed: boolean;

  constructor(projectItemRequest: any) {
    projectItemRequest = projectItemRequest ?? {};
    this.createdBy = projectItemRequest.createdBy;
    this.createdDate = projectItemRequest.createdDate ? moment(projectItemRequest.createdDate) : null;
    this.description = projectItemRequest.description;
    this.freelaApproved = projectItemRequest.freelaApproved;
    this.freelancer = projectItemRequest.freelancer;
    this.id = projectItemRequest.id;
    this.isActive = projectItemRequest.isActive;
    this.lastModifiedDate = projectItemRequest.lastModifiedDate ? moment(projectItemRequest.lastModifiedDate) : null;
    this.projectItem = projectItemRequest.projectItem ? new ProjectItem(projectItemRequest.projectItem) : null;
    this.project = projectItemRequest.project ? new Project(projectItemRequest.project) : null;
    this.projectStep = projectItemRequest.projectStep ? new ProjectStep(projectItemRequest.projectStep) : null;
    this.updatedBy = projectItemRequest.updatedBy;
    this.requestStatus = projectItemRequest.requestStatus;
    this.isApproved = projectItemRequest.requestStatus === ProjectItemRequestStatus.APPROVED;
    this.isDeclined = projectItemRequest.requestStatus === ProjectItemRequestStatus.DECLINED;
    this.isSubscribed = projectItemRequest.requestStatus === ProjectItemRequestStatus.SUBSCRIBED;
  }

}

export function getProjectItemRequestIdentifier(projectItemRequest: IProjectItemRequest): number | undefined {
  return projectItemRequest.id;
}
