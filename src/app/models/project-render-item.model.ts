import * as moment from 'moment';
import {Moment} from 'moment';
import {IProjectRender} from './project-render.model';
import {IProjectRenderItemStatus} from './enums/project-render-item-status.model';

export interface IProjectRenderItem {
  id?: number;
  name?: string | null;
  description?: string | null;
  renderSlug?: string | null;
  jsonData?: string | null;
  whatsapp?: string | null;
  dataSource?: string | null;
  startRenderDate?: Moment | null;
  expectedRenderDate?: Moment | null;
  exportedDate?: Moment | null;
  endRenderDate?: Moment | null;
  botName?: string | null;
  videoUrl?: string | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  renderProject?: IProjectRender | null;
  renderUid?: string | null;
  renderStatus?: IProjectRenderItemStatus | null;
  sambaUrl?: string;
  sambaId?: string | number;
  job?: any | null;

}

export class ProjectRenderItem implements IProjectRenderItem {
  botName: string | null;
  createdBy: string | null;
  createdDate: Moment | null;
  description: string | null;
  endRenderDate: moment.Moment | null;
  expectedRenderDate: moment.Moment | null;
  exportedDate: moment.Moment | null;
  id: number;
  job: any | null;
  jsonData: string | null;
  whatsapp: string | null;
  dataSource: string | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  name: string | null;
  renderProject: IProjectRender | null;
  renderSlug: string | null;
  renderUid: string | null;
  startRenderDate: Moment | null;
  videoUrl: string | null;
  renderStatus: IProjectRenderItemStatus | null;
  sambaUrl?: string;
  sambaId?: string | number;

  constructor(item: any = null) {
    item = item ?? {};
    this.botName = item.botName;
    this.createdBy = item.createdBy;
    this.createdDate = item.createdDate ? moment(item.createdDate) : null;
    this.description = item.description;
    this.endRenderDate = item.endRenderDate ? moment(item.endRenderDate) : null;
    this.exportedDate = item.exportedDate ? moment(item.exportedDate) : null;
    this.expectedRenderDate = item.expectedRenderDate ? moment(item.expectedRenderDate) : null;
    this.id = item.id;
    this.job = item.job;
    this.whatsapp = item.whatsapp;
    this.jsonData = item.jsonData;
    this.dataSource = item.dataSource;
    this.lastModifiedBy = item.lastModifiedBy;
    this.lastModifiedDate = item.lastModifiedDate ? moment(item.lastModifiedDate) : null;
    this.name = item.name;
    this.renderProject = item.renderProject;
    this.renderSlug = item.renderSlug;
    this.renderUid = item.renderUid;
    this.startRenderDate = item.startRenderDate ? moment(item.startRenderDate) : null;
    this.videoUrl = item.videoUrl;
    this.renderStatus = item.renderStatus;
    this.exportedDate = item.exportedDate;
    this.sambaUrl = item.sambaUrl;
    this.sambaId = item.sambaId;
  }
}

export function getProjectRenderItemIdentifier(projectRenderItem: IProjectRenderItem): number | undefined {
  return projectRenderItem.id;
}
