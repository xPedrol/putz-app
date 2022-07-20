import { Component, OnInit } from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[
    NbThemeService
  ]
})
export class DashboardComponent implements OnInit {
  features = [
    {
      title: 'Hiper Personalização',
      description: 'Cada vídeo é gerado usando dados do usuário que irá receber.',
      icon: '/assets/img/intro.svg',
      link: 'docs',
    },
    {
      title: 'Customização',
      description: 'Conheça o quanto vc é especial e quanto seu cliente é especial com ideias customizadas para o seu negócio e seu público.',
      icon: '/assets/img/guides.svg',
      link: 'docs/guides/install-based-on-starter-kit',
    },
    {
      title: 'Processo',
      description: 'Uma oficina criativa, mas temos processos definidos para todas as etapas de entrega de um projeto',
      icon: '/assets/img/components.svg',
      link: 'docs/components/components-overview',
    },
    {
      title: 'Design e Criatividade',
      description: `A Criatividade é a essência da Putz Filmes a mais de 10 anos.
                    A Tecnologia é nossa vocação.`,
      icon: '/assets/img/themes.svg',
      link: 'docs/design-system/eva-design-system-intro',
    },
    {
      title: 'Autenticação',
      description: 'Nossa API integração de sistemas utiliza os protocolos de segurança e é aberta a parceiros.',
      icon: '/assets/img/auth.svg',
      link: 'docs/auth/introduction',
    },
    {
      title: 'Segurança e LGPD',
      description: 'Estamos preparados e preocupados com a segurança da informação.',
      icon: '/assets/img/security.svg',
      link: 'docs/security/introduction',
    },
  ];

  advantages = [
    {
      title: 'Modular',
      description: `Each feature is a separate npm module. Use only what you need.`,
      icon: '/assets/img/modular.svg',
    },
    {
      title: 'Configurable',
      description: `Sizes, colors, appearances, shapes, and other useful settings.`,
      icon: '/assets/img/native.svg',
    },
    {
      title: 'Open',
      description: `Source code is free and available under the MIT license.`,
      icon: '/assets/img/open-sourced.svg',
    },
    {
      title: 'Customizable',
      description: `A straightforward way to integrate your brand.`,
      icon: '/assets/img/extendable.svg',
    },
  ];

  constructor(
    private themeService:NbThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.changeTheme('docs-home')
  }

}
