import { IMenuSiteItemModel, MenuSiteType } from "../../../../services/menu-site-item.model";

export const navigationEuVotoLula: IMenuSiteItemModel[] = [
  { type: MenuSiteType.ANCHOR, name: "Inicio", link: 'home' },
  { type: MenuSiteType.ANCHOR, name: "Como Funciona", link: 'how-it-works' },
  { type: MenuSiteType.ANCHOR, name: "Meu Vídeo", link: 'render-video' },
  { type: MenuSiteType.DROPDOWN, name: "Versões", link: '#',
    child: [
      { type: MenuSiteType.LINK, name: "Direto", link: '/videos/lula/direto' },
      { type: MenuSiteType.LINK, name: "Direto com whatsapp", link: '/videos/lula/diretowhatsapp' },
      { type: MenuSiteType.LINK, name: "Validação e Whatsapp", link: '/videos/lula/whatsapp' },
    ]
  },
];
