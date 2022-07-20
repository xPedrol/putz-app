import {Moment} from 'moment';
import {ISatisfactionSurvey} from './satisfaction-survey.model';
import {QuestionType} from './enums/question-type.model';


export interface IQuestion {
  id?: number;
  name?: string | null;
  description?: string | null;
  value?: string | null;
  questionType?: QuestionType;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  answers?: ISatisfactionSurvey[] | null;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public value?: string | null,
    public questionType?: QuestionType,
    public isActive?: boolean | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null,
    public answers?: ISatisfactionSurvey[] | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getQuestionIdentifier(question: IQuestion): number | undefined {
  return question.id;
}
