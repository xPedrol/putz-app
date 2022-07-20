import { IMenuSiteItemModel, MenuSiteType } from "../../../services/menu-site-item.model";
import {navigationBasicPutz} from "../navigationBasicPutz";

export const navigationClientes: IMenuSiteItemModel[] = [
  { type: MenuSiteType.ANCHOR, name: "Inicio", link: 'home' },
  { type: MenuSiteType.ANCHOR, name: "Serviços", link: 'plataforma' },
  { type: MenuSiteType.ANCHOR, name: "indusdria", link: 'services' },
  { type: MenuSiteType.ANCHOR, name: "Governo", link: 'feedback' },
  { type: MenuSiteType.ANCHOR, name: "Contato", link: 'contact' },
  ...navigationBasicPutz
];
