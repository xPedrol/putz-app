import { IMenuSiteItemModel, MenuSiteType } from "../../../services/menu-site-item.model";
import {navigationBasicPutz} from "../navigationBasicPutz";

export const navigationEpa: IMenuSiteItemModel[] = [
  { type: MenuSiteType.ANCHOR, name: "Inicio", link: 'home' },
  { type: MenuSiteType.ANCHOR, name: "Vantagens", link: 'about' },
  { type: MenuSiteType.ANCHOR, name: "Serviços", link: 'services' },
  { type: MenuSiteType.ANCHOR, name: "Depoimentos", link: 'feedback' },
  { type: MenuSiteType.ANCHOR, name: "Contato", link: 'contact' },
  ...navigationBasicPutz
];
