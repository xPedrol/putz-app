import {IMenuSiteItemModel, MenuSiteType} from "./menu-site-item.model";

export const navigationExample: IMenuSiteItemModel[] = [
  { type: MenuSiteType.DROPDOWN, name: "Home", link: '#',
    child: [
      { type: MenuSiteType.LINK, name: "Putz Parceiros", link: '/plataform' },
      { type: MenuSiteType.LINK, name: "Putz Startup", link: '/startup' },
      { type: MenuSiteType.DIVIDER, name: "divider"},
      { type: MenuSiteType.LINK, name: "Putz SmartVideos", link: '/samrt-videos' },
    ]
  },
  { type: MenuSiteType.ANCHOR, name: "Home", link: 'home' },
  { type: MenuSiteType.ANCHOR, name: "About Us", link: 'about' },
  { type: MenuSiteType.ANCHOR, name: "Services", link: 'services' },
  { type: MenuSiteType.ANCHOR, name: "Portfolio", link: 'portfolio' },
  { type: MenuSiteType.ANCHOR, name: "Team", link: 'team' },
  { type: MenuSiteType.ANCHOR, name: "Blog", link: 'blog' },
  { type: MenuSiteType.ANCHOR, name: "Contact Us", link: 'contact' },
  { type: MenuSiteType.LINK, name: "Docs", link: '/docs' },
  { type: MenuSiteType.LINK, name: "Demos", link: '/demos' },
];
