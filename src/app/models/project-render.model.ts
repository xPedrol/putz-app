import {Moment} from 'moment';
import {IProjectRenderItem} from './project-render-item.model';


export interface IProjectRender {
  createdBy: string;
  createdDate: Moment;
  description: string;
  id: 0;
  isActive: true;
  jsonTemplate: string;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  name: string;
  numberOfItems: 0;
  renderSlug: string;
  sambaAccessToken: string;
  sambaAppId: string;
  sambaPid: 0;
  videosPerDay: 0;
  videosPerMonth: 0;
  whatsappBot: string;
  isCsvRenderProject: boolean;
  whatsappFinishMsg: string;
  whatsappShareMsg: string;
  whatsappWaitMsg: string;
  whatsappWelcomeMsg: string;
  renderItens?: IProjectRenderItem[] | null;
  hasSambaId: boolean;
}

export class ProjectRender implements IProjectRender {
  createdBy: string;
  createdDate: Moment;
  description: string;
  id: 0;
  isActive: true;
  jsonTemplate: string;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  name: string;
  numberOfItems: 0;
  renderSlug: string;
  sambaAccessToken: string;
  sambaAppId: string;
  sambaPid: 0;
  videosPerDay: 0;
  videosPerMonth: 0;
  whatsappBot: string;
  isCsvRenderProject: boolean;
  whatsappFinishMsg: string;
  whatsappShareMsg: string;
  whatsappWaitMsg: string;
  whatsappWelcomeMsg: string;
  renderItens?: IProjectRenderItem[] | null;
  hasSambaId: boolean;


  constructor(projectRender: any = {}) {
    this.createdBy = projectRender.createdBy;
    this.createdDate = projectRender.createdDate;
    this.description = projectRender.description;
    this.id = projectRender.id;
    this.isActive = projectRender.isActive;
    this.jsonTemplate = projectRender.jsonTemplate;
    this.lastModifiedBy = projectRender.lastModifiedBy;
    this.lastModifiedDate = projectRender.lastModifiedDate;
    this.name = projectRender.name;
    this.numberOfItems = projectRender.numberOfItems;
    this.renderSlug = projectRender.renderSlug;
    this.sambaAccessToken = projectRender.sambaAccessToken;
    this.sambaAppId = projectRender.sambaAppId;
    this.sambaPid = projectRender.sambaPid;
    this.videosPerDay = projectRender.videosPerDay;
    this.videosPerMonth = projectRender.videosPerMonth;
    this.whatsappBot = projectRender.whatsappBot;
    this.whatsappFinishMsg = projectRender.whatsappFinishMsg;
    this.whatsappShareMsg = projectRender.whatsappShareMsg;
    this.whatsappWaitMsg = projectRender.whatsappWaitMsg;
    this.whatsappWelcomeMsg = projectRender.whatsappWelcomeMsg;
    this.renderItens = projectRender.renderItens;
    this.isCsvRenderProject = projectRender.isCsvRenderProject;
    this.hasSambaId = !!this.sambaPid;
  }
}

export function getProjectRenderIdentifier(projectRender: IProjectRender): number | undefined {
  return projectRender.id;
}
