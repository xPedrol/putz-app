import { IMenuSiteItemModel, MenuSiteType } from "../../../services/menu-site-item.model";
import {navigationBasicPutz} from "../navigationBasicPutz";

export const navigationVarejo: IMenuSiteItemModel[] = [
  { type: MenuSiteType.ANCHOR, name: "Inicio", link: 'home' },
  { type: MenuSiteType.ANCHOR, name: "Serviços", link: 'services' },
  { type: MenuSiteType.ANCHOR, name: "Casos", link: 'casos' },
  { type: MenuSiteType.ANCHOR, name: "Contato", link: 'contact' },
  ...navigationBasicPutz
];
