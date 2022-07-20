export interface IAppMenu{
  title: string;
  icon: string;
  link?: string;
  url?: string;
  target?: string;
  name: string;
  hidden?: boolean;
  queryParams?: any;
  pathMatch?: string;
  noAuth?: boolean;
  children?: IAppMenu[] | any;
  description?: string;
}
