
import {Moment} from 'moment';
import {IProjectStep} from './project-step.model';
import {ISchedule} from './schedule.model';

export interface IStep {
  id?: number;
  name?: string;
  description?: string | null;
  itemIndex?: number;
  iconUrl?: string | null;
  iconProgessUrl?: string | null;
  iconFinishUrl?: string | null;
  isActive?: boolean | null;
  days?: number | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  projectSteps?: IProjectStep[] | null;
  schedule?: ISchedule | null;
}

export class Step implements IStep {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public itemIndex?: number,
    public iconUrl?: string | null,
    public iconProgessUrl?: string | null,
    public iconFinishUrl?: string | null,
    public isActive?: boolean | null,
    public days?: number | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public projectSteps?: IProjectStep[] | null,
    public schedule?: ISchedule | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getStepIdentifier(step: IStep): number | undefined {
  return step.id;
}
