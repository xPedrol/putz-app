import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {
  CustomerPagesOneColumnLayoutComponent
} from './customer-pages-one-column-layout/customer-pages-one-column-layout.component';
import {NbLayoutModule, NbSidebarModule} from '@nebular/theme';
import {
  MainAppLayoutComponentModule
} from '../../../../../src/app/shared/main-app-layout-page/main-app-layout-component/main-app-layout-component.module';
import {
  PageNotFoundComponent
} from '../../../../../src/app/shared/components/not-founds/page-not-found/page-not-found.component';
import {AccountResolver} from '../../../../../src/app/resolvers/account.resolver';
import {NgdMenuService} from '../services/menu.service';
import {STRUCTURE} from '../services/app.options';
import {structure} from './docs/structure';
import {NgdStructureService} from '../services/structure.service';
import {NgdArticleService} from '../services/article.service';
import {NgdTextService} from '../services/text.service';
import {NgdPaginationService} from '../services/pagination.service';
import {NgdLastViewedSectionService} from '../services/last-viewed-section.service';
import {NgdVisibilityService} from '../services/visibility.service';
import {
  CostumerPagesLayoutComponentsModule
} from './customer-pages-one-column-layout/costumer-pages-layout-components/costumer-pages-layout-components.module';
import {GuidedTourModule} from '../../../../guided-tour/src/lib/guided-tour.module';

const routes: Routes = [
  {
    path: 'hero',
    loadChildren: () => import('./base-hero-page/base-hero-page.module').then(m => m.BaseHeroPageModule)
  },
  {
    path: '',
    component: CustomerPagesOneColumnLayoutComponent,
    resolve: {account: AccountResolver},
    children: [
      {
        path: 'criativa',
        loadChildren: () => import('./criativa/criativa.module').then(m => m.CriativaModule)
      },
      {
        path: 'franq-poc',
        loadChildren: () => import('./franq/franq.module').then(m => m.FranqModule)
      },
      {
        path: 'poc',
        loadChildren: () => import('./poc/poc.module').then(m => m.PocModule)
      },
      {
        path: 'galo-poc',
        loadChildren: () => import('./galo/galo-poc.module').then(m => m.GaloPocModule)
      },
      {
        path: 'voto-lula',
        loadChildren: () => import('./voto-lula/voto-lula.module').then(m => m.VotoLulaModule)
      },
      {
        path: 'wine',
        loadChildren: () => import('./wine/wine.module').then(m => m.WineModule)
      },
      {
        path: 'creditas',
        loadChildren: () => import('./creditas/creditas.module').then(m => m.CreditasModule)
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'docs',
        loadChildren: () => import('./docs/documentation.module').then(m => m.NgdDocumentationModule)
      },
      {
        path: 'faqs',
        loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
      },
      {
        path: '404',
        component: PageNotFoundComponent
      },
      {path: '**', redirectTo: '/404'}
    ]
  }
];

@NgModule({
  declarations: [
    CustomerPagesOneColumnLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    NbLayoutModule,
    MainAppLayoutComponentModule,
    NbSidebarModule,
    CostumerPagesLayoutComponentsModule,
    GuidedTourModule
  ],
  providers: [
    Title, {provide: STRUCTURE, useValue: structure},
    NgdMenuService,
    NgdStructureService,
    NgdArticleService,
    NgdTextService,
    NgdPaginationService,
    NgdLastViewedSectionService,
    NgdVisibilityService
  ],
})
export class PagesModule {
}
