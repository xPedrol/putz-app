import { IMenuSiteItemModel, MenuSiteType } from "../../services/menu-site-item.model";

export const navigationBasicPutz: IMenuSiteItemModel[] = [
  { type: MenuSiteType.DROPDOWN, name: "Soluções", link: '#',
    child: [
      { type: MenuSiteType.LINK, name: "Vídeos para Varejo", link: '/servicos/solucoes/varejo' },
      { type: MenuSiteType.LINK, name: "Vídeos para Tecnologia", link: '/servicos/solucoes/tecnologia', future: true },
      { type: MenuSiteType.LINK, name: "Vídeos para FinTechs", link: '/servicos/solucoes/fintech', future: true },
      { type: MenuSiteType.LINK, name: "Vídeos para Serviços", link: '/servicos/solucoes/servicos', future: true },
      { type: MenuSiteType.LINK, name: "Vídeos para Industria", link: '/servicos/solucoes/fintech', future: true },
      { type: MenuSiteType.LINK, name: "Vídeos para Marcas", link: '/servicos/solucoes/marcas', future: true },
      { type: MenuSiteType.LINK, name: "Vídeos para Eleições", link: '/servicos/solucoes/eleicoes' },
    ]
  },
  { type: MenuSiteType.DROPDOWN, name: "Somos a Putz", link: '#',
    child: [
      { type: MenuSiteType.LINK, name: "EPA - Ecossistema Putz", link: '/servicos/epa' },
      { type: MenuSiteType.LINK, name: "Plataforma", link: '/servicos/plataforma' },
      { type: MenuSiteType.LINK, name: "Sou Freelancer", link: '/servicos/plataforma', future: true },
      { type: MenuSiteType.LINK, name: "Sou Agência", link: '/servicos/plataforma', future: true },
      { type: MenuSiteType.LINK, name: "Conteúdo", link: '/servicos/blog', future: true },
      { type: MenuSiteType.DIVIDER, name: "divider"},
      { type: MenuSiteType.LINK, name: "Putz Startup", link: '/servicos/startup' },
      { type: MenuSiteType.LINK, name: "Putz Produtora", link: '/servicos/produtora' },
      { type: MenuSiteType.LINK, name: "Putz SmartVideos", link: '/servicos/smart-videos' },
      { type: MenuSiteType.LINK, name: "Clientes Putz", link: '/servicos/clientes' },
      { type: MenuSiteType.LINK, name: "Orçamento Online", link: '/servicos/clientes', future: true },
    ]
  },
];
