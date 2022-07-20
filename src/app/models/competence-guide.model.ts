import {Level} from './enums/level.model';
import {ICompetence} from './competence.model';
import {Moment} from 'moment';
import * as moment from 'moment'
export interface ICompetenceGuide {
  id?: number;
  level?: Level;
  name?: string;
  slug?: string;
  description?: string | null;
  markDown?: string | null;
  htmlPage?: string | null;
  fileLink?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  isActive?: boolean | null;
  isVerified?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  competence?: ICompetence | null;
}

export class CompetenceGuide implements ICompetenceGuide {
  competence: ICompetence | null;
  createdBy: string | null;
  createdDate: Moment | null;
  description: string | null;
  file: string | null;
  fileContentType: string | null;
  fileLink: string | null;
  htmlPage: string | null;
  id: number;
  isActive: boolean | null;
  isVerified: boolean | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  level: Level;
  markDown: string | null;
  name: string;
  slug: string;

  constructor(competenceGuide: any) {
    competenceGuide = competenceGuide ?? {};
    this.competence = competenceGuide.competence;
    this.createdBy = competenceGuide.createdBy;
    this.createdDate = competenceGuide.createdDate?moment(competenceGuide.createdDate):null;
    this.description = competenceGuide.description;
    this.file = competenceGuide.file;
    this.fileContentType = competenceGuide.fileContentType;
    this.fileLink = competenceGuide.fileLink;
    this.htmlPage = competenceGuide.htmlPage;
    this.id = competenceGuide.id;
    this.isActive = competenceGuide.isActive;
    this.isVerified = competenceGuide.isVerified;
    this.lastModifiedBy = competenceGuide.lastModifiedBy;
    this.lastModifiedDate = competenceGuide.lastModifiedDate?moment(competenceGuide.lastModifiedDate):null;
    this.level = competenceGuide.level;
    this.markDown = competenceGuide.markDown;
    this.name = competenceGuide.name;
    this.slug = competenceGuide.slug;
  }

}

export function getCompetenceGuideIdentifier(competenceGuide: ICompetenceGuide): number | undefined {
  return competenceGuide.id;
}
