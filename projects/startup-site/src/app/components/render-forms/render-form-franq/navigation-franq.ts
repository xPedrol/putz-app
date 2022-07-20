import { IMenuSiteItemModel, MenuSiteType } from "../../../services/menu-site-item.model";

export const navigationFranq: IMenuSiteItemModel[] = [
  { type: MenuSiteType.ANCHOR, name: "Inicio", link: 'home' },
  { type: MenuSiteType.ANCHOR, name: "Como Funciona", link: 'how-it-works' },
  { type: MenuSiteType.ANCHOR, name: "Contato", link: 'video' },
];
