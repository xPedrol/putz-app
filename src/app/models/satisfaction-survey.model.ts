import {Moment} from 'moment';
import {IProject} from './project.model';
import {IQuestion} from './question.model';


export interface ISatisfactionSurvey {
  id?: number;
  name?: string | null;
  description?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  project?: IProject | null;
  question?: IQuestion | null;
}

export class SatisfactionSurvey implements ISatisfactionSurvey {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public isActive?: boolean | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public project?: IProject | null,
    public question?: IQuestion | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getSatisfactionSurveyIdentifier(satisfactionSurvey: ISatisfactionSurvey): number | undefined {
  return satisfactionSurvey.id;
}
