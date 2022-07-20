
import {Moment} from 'moment';
import {IStep} from './step.model';

export interface ISchedule {
  id?: number;
  name?: string | null;
  description?: string | null;
  days?: number | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  projectSteps?: IStep[] | null;
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public days?: number | null,
    public isActive?: boolean | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public projectSteps?: IStep[] | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getScheduleIdentifier(schedule: ISchedule): number | undefined {
  return schedule.id;
}
