import {Moment} from 'moment';
import {ITimeLineEvent} from './time-line-event.model';


export interface IProjectStepChange {
  id?: number;
  name?: string;
  description?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  event?: ITimeLineEvent | null;
}

export class ProjectStepChange implements IProjectStepChange {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public isActive?: boolean | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public event?: ITimeLineEvent | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getProjectStepChangeIdentifier(projectStepChange: IProjectStepChange): number | undefined {
  return projectStepChange.id;
}
