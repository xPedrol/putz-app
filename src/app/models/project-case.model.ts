import {IProjectBasic} from './basics/project-basic.model';
import {ServiceAreaTypeEnum} from './enums/service-area-type.model';
import {Moment} from 'moment';

export interface IProjectCase {
  createdBy: string;
  lastModifiedBy: string;
  customerCompany: string;
  customerExperience: string;
  customerName: string;
  details: string;
  id: number;
  itemIndex: number;
  name: string;
  online: true;
  problem: string;
  project: IProjectBasic;
  serviceAreaType: ServiceAreaTypeEnum;
  solution: string;
  videoThumbs: string;
  videoUrl: string;
  createdDate: Moment;
  lastModifiedDate: Moment;
  isActive: boolean;
}

export class ProjectCase implements IProjectCase {
  createdBy: string;
  lastModifiedBy: string;
  customerCompany: string;
  customerExperience: string;
  customerName: string;
  details: string;
  id: number;
  itemIndex: number;
  name: string;
  online: true;
  problem: string;
  project: IProjectBasic;
  serviceAreaType: ServiceAreaTypeEnum;
  solution: string;
  videoThumbs: string;
  videoUrl: string;
  createdDate: Moment;
  lastModifiedDate: Moment;
  isActive: boolean;

  constructor(projectCase: any = {}) {
    this.customerCompany = projectCase.customerCompany;
    this.customerExperience = projectCase.customerExperience;
    this.customerName = projectCase.customerName;
    this.details = projectCase.details;
    this.id = projectCase.id;
    this.itemIndex = projectCase.itemIndex;
    this.name = projectCase.name;
    this.online = projectCase.online;
    this.problem = projectCase.problem;
    this.project = projectCase.project;
    this.serviceAreaType = projectCase.serviceAreaType;
    this.solution = projectCase.solution;
    this.videoThumbs = projectCase.videoThumbs;
    this.videoUrl = projectCase.videoUrl;
    this.createdDate = projectCase.createdDate;
    this.lastModifiedDate = projectCase.lastModifiedDate;
    this.isActive = projectCase.isActive;
    this.createdBy = projectCase.createdBy;
    this.lastModifiedBy = projectCase.lastModifiedBy;
  }

}


export function getProjectCaseIdentifier(projectCase: IProjectCase): number | undefined {
  return projectCase.id;
}
