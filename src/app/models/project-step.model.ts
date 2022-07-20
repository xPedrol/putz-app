import * as moment from 'moment';
import {Moment} from 'moment';
import {IProjectItem} from './project-item.model';
import {IProject} from './project.model';
import {IStep} from './step.model';
import {ITimeLineEvent, TimeLineEvent} from './time-line-event.model';
import {DATE_TIME_FORMAT} from '../config/input.constants';

export interface IProjectStep {
  id?: number;
  name?: string;
  description?: string | null;
  itemIndex?: number;
  iconUrl?: string | null;
  days?: number | null;
  startDate?: Moment | null;
  startDateExpected?: Moment | null;
  endDate?: Moment | null;
  endDateExpected?: Moment | null;
  isActive?: boolean | null;
  changeNumber?: number | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  events: ITimeLineEvent[] | null;
  projectItens?: IProjectItem[] | null;
  step?: IStep | null;
  project?: IProject | null;
  calcAprovDays?: number | null;
  calcExtradays?: number | null;
  calcTotalDays?: number | null;
  forecastEndDate?: Moment | null;
  forecastFreelaEndDate?: Moment | null;
  isCurrent: boolean;
  reachedProjectChangeMaxNumber?: boolean | null;

  timeLineEventsWithClass(events: ITimeLineEvent[]): ITimeLineEvent[];

  checkIsCurrent(): boolean;
}

export class ProjectStep implements IProjectStep {
  changeNumber: number | null;
  createdBy: string | null;
  createdDate: Moment | null;
  iconUrl: string | null;
  days: number | null;
  description: string | null;
  events: ITimeLineEvent[] | null;
  id: number;
  isActive: boolean | null;
  itemIndex: number;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  name: string;
  project: IProject | null;
  projectItens: IProjectItem[] | null;
  startDate: Moment | null;
  endDate: Moment | null;
  startDateExpected: Moment | null;
  endDateExpected: Moment | null;
  forecastEndDate: Moment | null;
  forecastFreelaEndDate: Moment | null;
  step: IStep | null;
  calcAprovDays: number | null;
  calcExtradays: number | null;
  calcTotalDays: number | null;
  isCurrent: boolean;
  reachedProjectChangeMaxNumber?: boolean | null;

  constructor(projectStep: any) {
    projectStep = projectStep || {};
    this.changeNumber = projectStep.changeNumber;
    this.createdBy = projectStep.createdBy;
    this.createdDate = projectStep.createdDate ? moment(projectStep.createdDate) : null;
    this.days = projectStep.days;
    this.description = projectStep.description;
    this.events = this.timeLineEventsWithClass(projectStep.events);
    this.id = projectStep.id;
    this.isActive = projectStep.isActive;
    this.itemIndex = projectStep.itemIndex;
    this.lastModifiedBy = projectStep.lastModifiedBy;
    this.lastModifiedDate = projectStep.lastModifiedDate ? moment(projectStep.lastModifiedDate) : null;
    this.name = projectStep.name;
    this.project = projectStep.project;
    this.projectItens = projectStep.projectItens;
    this.startDate = projectStep.startDate ? moment(projectStep.startDate) : null;
    this.startDateExpected = projectStep.startDateExpected ? moment(projectStep.startDateExpected) : null;
    this.endDate = projectStep.endDate ? moment(projectStep.endDate) : null;
    this.endDateExpected = projectStep.endDateExpected ? moment(projectStep.endDateExpected) : null;
    this.forecastEndDate = projectStep.forecastEndDate ? moment(projectStep.forecastEndDate) : null;
    this.forecastFreelaEndDate = projectStep.forecastFreelaEndDate ? moment(projectStep.forecastFreelaEndDate) : null;
    this.step = projectStep.step;
    this.iconUrl = projectStep.iconUrl;
    this.calcAprovDays = projectStep.calcAprovDays;
    this.calcExtradays = projectStep.calcExtradays;
    this.calcTotalDays = projectStep.calcTotalDays;
    this.isCurrent = this.checkIsCurrent();
    this.reachedProjectChangeMaxNumber = this.verifyChangeMaxNumber();
  }

  verifyChangeMaxNumber(): boolean {
    if (this.project && this.project?.changeMaxNumber) {
      return (this.changeNumber ?? 0) === this.project.changeMaxNumber;
    }
    return false;
  }

  timeLineEventsWithClass(events: ITimeLineEvent[]): ITimeLineEvent[] {
    if (events && events?.length > 0) {
      return events.map(event => {
        return new TimeLineEvent(event);
      });
    }
    return [];
  }

  checkIsCurrent(): boolean {
    const today = moment();
    const startBeforeToday = this.startDate ? today.isSameOrAfter(this.startDate) : false;
    const endDateAfterToday = this.endDate ? today.isSameOrBefore(this.endDate) : true;
    return startBeforeToday && endDateAfterToday;
  }
}

export function getProjectStepIdentifier(projectStep: IProjectStep): number | undefined {
  return projectStep.id;
}
