import { Moment } from 'moment';

export interface ILanguageBasic {
  id?: string;
  langid?: string;
  name?: string;
  extensions?: Array<string>;
  requireEntryPoint?: boolean;
  entryPointDescription?: string;
  allowSubmit?: boolean;
  allowJudge?: boolean;
  timeFactor?: number;
  filterCompilerFiles?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  compileScriptId?: string;
}

export class LanguageBasic implements ILanguageBasic {
  constructor(
    public id?: string,
    public langid?: string,
    public name?: string,
    public extensions?: Array<string>,
    public requireEntryPoint?: boolean,
    public entryPointDescription?: string,
    public allowSubmit?: boolean,
    public allowJudge?: boolean,
    public timeFactor?: number,
    public filterCompilerFiles?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public compileScriptId?: string
  ) {
    this.requireEntryPoint = this.requireEntryPoint || false;
    this.allowSubmit = this.allowSubmit || false;
    this.allowJudge = this.allowJudge || false;
    this.filterCompilerFiles = this.filterCompilerFiles || false;
  }
}

export const languageBasicTableColumn = [
  {
    title: 'ID',
    class: 'text-md-start',
  },
  {
    title: 'Name',
    class: 'text-md-start',
  },
  {
    title: 'Extensions',
    class: 'text-md-start',
  },
  {
    title: 'Allow Submit',
    class: 'text-md-start',
  },
  {
    title: 'Allow Judge',
    class: 'text-md-start',
  },
  {
    title: '',
    class: 'text-md-end',
  },
  {
    title: '',
    class: 'text-md-end',
  },
];
