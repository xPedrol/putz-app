import {Moment} from 'moment';
import {InsuranceType} from './enums/project-insurance-type.model';

export interface IConfigParams {
  id?: number;
  name?: string | null;
  slug?: InsuranceType | null;
  description?: string | null;
  isActive?: boolean | null;
  configParamsType?: string | null;
  value?: string | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
}

export class ConfigParams implements IConfigParams {
  constructor(
    public id?: number,
    public name?: string | null,
    public InsuranceType?: string | null,
    public isActive?: boolean | null,
    public description?: string | null,
    public configParamsType?: string | null,
    public value?: string | null,
    public createdDate?: Moment | null,
    public lastModifiedDate?: Moment | null,
    public createdBy?: string | null,
    public lastModifiedBy?: string | null
  ) {
    this.isActive = this.isActive ?? false;
  }
}

export function getConfigParamsIdentifier(configParams: IConfigParams): number | undefined {
  return configParams.id;
}
