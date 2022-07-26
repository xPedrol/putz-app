import {Injectable} from '@angular/core';
import {NbAccessChecker} from '@nebular/security';
import {ProjectStatus} from '../../models/enums/project-status.model';
import {BehaviorSubject, combineLatest, Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {IAppMenu} from "../../models/app-menu.model";


@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  mainAppItems: IAppMenu[];
  costumerPagesAppItems: IAppMenu[];
  currentMenu$: BehaviorSubject<IAppMenu[]>;

  constructor(
    private accessChecker: NbAccessChecker
  ) {
    this.currentMenu$ = new BehaviorSubject<IAppMenu[]>([]);
    this.costumerPagesAppItems = [
      {
        title: 'Sobre a Putz',
        name: 'about-putz',
        icon: '',
        url: 'https://www.putzfilmes.com',
        target: '_blank',
        noAuth: true
      },
      {
        title: 'Docs',
        name: 'faq-putz',
        icon: '',
        link: '/docs',
        noAuth: true
      },
      {
        title: 'Faq',
        name: 'faq-putz',
        icon: '',
        link: '/faqs',
        noAuth: true
      },
    ];
    this.mainAppItems = [
      {
        title: 'Painel de controle',
        icon: 'home-outline',
        link: `/dashboard`,
        name: 'dashboard',
        description: 'Por aqui você acessa seu painel de controle. Onde é possível ver sua lista de projetos e caso seja um freelancer, seus portfólios e inscrições aprovadas e pendentes (Em breve).'
      },
      {
        title: 'Clientes',
        icon: 'people-outline',
        link: `/people/dashboard`,
        name: 'client',
        description: 'Lista de todos os usuários do sistema. Sendo possível alterar seus dados, além de controlar o acesso e permissões destes.'
      },
      {
        title: 'Orçamentos',
        icon: 'book-outline',
        link: `/projects/dashboard`,
        queryParams: {projectStatus: [ProjectStatus.CONCEPTION, ProjectStatus.BRIEFING]},
        name: 'conception-list',
        pathMatch: 'full',
        description: 'Lista de projetos em preparação. São projetos que ainda não entraram em execução. Mas possuem orçamento e cronograma.'
      },
      {
        title: 'Projetos',
        icon: 'book-outline',
        link: `/projects/dashboard`,
        name: 'project-list',
        pathMatch: 'full',
        description: 'Lista de projetos em desenvolvimento os quais você tem acesso. Podem ter timeline ou não, o que varia de projeto para projeto. '
      },
      {
        title: 'Oportunidades',
        icon: 'bulb-outline',
        link: `/opportunities/opened/list`,
        name: 'opened-opportunity',
        description: 'Lista de etapas de projetos que possuem vagas abertas. Aqui é onde o freelancer encontra seu trabalho.'
      },
      {
        title: 'Inscrições',
        icon: 'bulb-outline',
        link: `/opportunities/dashboard`,
        name: 'opportunity',
        description: 'Lista de etapas de projetos em que você se inscreveu. Aqui você acompanha o status da sua soliçitação.'
      },
      {
        title: 'Portfolio',
        icon: 'color-palette-outline',
        name: 'portfolio-manager',
        description: 'Nesta página o freelancer visualiza e cadastra seu portfólio, que é usado como referência de suas habilidades. Um bom portfólio resulta em mais chances de ser escolhido para trabalhos.',
        children: [
          {
            title: 'Meu Portfolio',
            icon: 'color-palette-outline',
            link: `/portfolios/dashboard`,
            name: 'my_portfolio',
          },
          {
            title: 'Portfolios',
            icon: 'color-palette-outline',
            link: `/manager/portfolios`,
            name: 'all_portfolio',
          }
        ]
      },
      {
        title: 'Cadastros',
        icon: 'color-palette-outline',
        name: 'competence-crud',
        description: 'CRUDS do sistema (área administrativa)',
        children: [
          {
            title: 'Competência',
            link: `/admin/competences/dashboard`,
            name: 'competence-crud',
          },
          {
            title: 'Guia de competência',
            link: `/admin/competences/guides/dashboard`,
            name: 'competence-guide-crud',
          },
          {
            title: 'Tags',
            link: `/admin/tags/dashboard`,
            name: 'tag-crud',
          },
          {
            title: 'Produtos',
            link: `/admin/products/dashboard`,
            name: 'product-crud',
          },
          {
            title: 'Project Cases',
            link: `/admin/project/cases/dashboard`,
            name: 'project-cases-crud',
          }
        ]
      }
    ];
  }

  getMainAppItems(): IAppMenu[] {
    const subscribes: Observable<any>[] = [];
    for (let item of this.mainAppItems) {
      this.mainAppItems.map(item => {
        subscribes.push(this.verifyAccess(item));

      });
    }
    combineLatest(subscribes).subscribe(() => {
      this.currentMenu$.next(this.mainAppItems);
    });
    return this.mainAppItems;
  }

  getCustomerPagesItems(): IAppMenu[] {
    const subscribes: Observable<any>[] = [];
    for (let item of this.costumerPagesAppItems) {
      this.costumerPagesAppItems.map(item => {
        subscribes.push(this.verifyAccess(item));
      });
    }
    combineLatest(subscribes).subscribe(() => {
      this.currentMenu$.next(this.costumerPagesAppItems);
    });
    return this.costumerPagesAppItems;
  }

  verifyAccess(item: IAppMenu): Observable<boolean> {
    if (!item.noAuth) {
      return this.accessChecker.isGranted('view', item.name).pipe(tap(value => {
        item.hidden = !value;
        if (item?.children) {
          (item.children as IAppMenu[]).forEach(child => {
            this.verifyAccess(child).subscribe();
          });
        }
      }));
    } else {
      item.hidden = false;
      return of(true);
    }
  }

  getMenuItemByName(menuName: string): IAppMenu {
    const menu = this.currentMenu$.getValue();
    return menu.find(item => item.name === menuName);
  }

  getMenuItemIndexByName(menuName: string): number {
    const menu = this.currentMenu$.getValue();
    return menu.findIndex(item => item.name === menuName);
  }

  setChildrenByName(menuName: string, children: IAppMenu[]): void {
    const menu = this.currentMenu$.getValue();
    if (menu) {
      const menuItem = menu[this.getMenuItemIndexByName(menuName)];
      if (menuItem) {
        menuItem.children = children;
      }
    }
    this.currentMenu$.next(menu);
  }
}
