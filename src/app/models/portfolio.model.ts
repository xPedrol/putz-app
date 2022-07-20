import * as moment from 'moment';
import {Moment} from 'moment';
import {Level} from './enums/level.model';
import {IPerson} from './person.model';
import {ITag} from './tag.model';
import {ICompetence} from './competence.model';
import {PortfolioRequestStatusEnum} from './enums/portfolio-request-status.model';


export interface IPortfolio {
  id?: number;
  level?: Level;
  name?: string;
  description?: string | null;
  isActive?: boolean | null;
  fileLink?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  requestStatus?: PortfolioRequestStatusEnum | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  updatedBy?: string | null;

  tags?: ITag[] | null;
  competence?: ICompetence | null;
  person?: IPerson | null;
}

export class Portfolio implements IPortfolio {
  competence: ICompetence | null;
  createdBy: string | null;
  createdDate: Moment | null;
  isActive: boolean | null;
  description: string | null;
  file: string | null;
  fileContentType: string | null;
  fileLink: string | null;
  id: number;
  requestStatus: PortfolioRequestStatusEnum | null;
  lastModifiedDate: Moment | null;
  level: Level;
  name: string;
  person: IPerson | null;
  tags: ITag[] | null;
  updatedBy: string | null;

  constructor(portfolio: any = null) {
    portfolio = portfolio ?? {};
    this.competence = portfolio.competence;
    this.isActive = portfolio.isActive;
    this.createdBy = portfolio.createdBy;
    this.createdDate = portfolio.createdDate ? moment(portfolio.createdDate) : null;
    this.description = portfolio.description;
    this.file = portfolio.file;
    this.fileContentType = portfolio.fileContentType;
    this.fileLink = portfolio.fileLink;
    this.id = portfolio.id;
    this.requestStatus = portfolio.requestStatus;
    this.lastModifiedDate = portfolio.lastModifiedDate ? moment(portfolio.lastModifiedDate) : null;
    this.level = portfolio.level;
    this.name = portfolio.name;
    this.person = portfolio.person;
    this.tags = portfolio.tags;
    this.updatedBy = portfolio.updatedBy;
  }

}

export function getPortfolioIdentifier(portfolio: IPortfolio): number | undefined {
  return portfolio.id;
}
