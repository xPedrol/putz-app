export enum MenuSiteType {
  LINK = 'link',
  DROPDOWN = 'dropdown',
  DIVIDER = 'divider',
  ANCHOR = 'anchor',
}

export interface IMenuSiteItemModel {
  type: MenuSiteType;
  name: string;
  link?: string;
  future?: boolean;
  child?: IMenuSiteItemModel[];
}
