import {IPersonBasic} from './basics/person.basic';
import {IProjectBasic} from './basics/project-basic.model';

export interface IConceptionCreation {
  id: string;
  agency: IPersonBasic;
  client: IPersonBasic;
  description: string;
  modelProject?: IProjectBasic;
  name: string;
  vendor: IPersonBasic;
  manager: IPersonBasic;
}

export class ConceptionCreation implements IConceptionCreation {
  id: string;
  agency: IPersonBasic;
  client: IPersonBasic;
  description: string;
  modelProject?: IProjectBasic;
  name: string;
  vendor: IPersonBasic;
  manager: IPersonBasic;

  constructor(conception: any = {}) {
    this.id = conception.id;
    this.agency = conception.agency;
    this.client = conception.client;
    this.description = conception.description;
    this.modelProject = conception.modelProject;
    this.name = conception.name;
    this.vendor = conception.vendor;
    this.manager = conception.manager;
  }

}
