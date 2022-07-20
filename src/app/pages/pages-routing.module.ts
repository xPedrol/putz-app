import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/interceptor/auth-guard.service';
import {allAuthorities, Authority} from '../constants/authority.constants';
import {
  MainAppOneColumnLayoutComponent
} from '../shared/main-app-layout-page/main-app-one-column-layout/main-app-one-column-layout.component';
import {DashboardFreelancerGuard} from "../core/interceptor/dashboard-freelancer-guard.service";

const routes: Routes = [
  {
    path: '',
    component: MainAppOneColumnLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [DashboardFreelancerGuard],
        data: {
          authorities: allAuthorities
        },
      },
      {
        path: 'dashboard/freelancer',
        loadChildren: () => import('./dashboard-freelancer/dashboard-freelancer.module').then(m => m.DashboardFreelancerModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.ADMIN, Authority.MANAGER, Authority.FREELANCER]
        }
      },
      {
        path: 'projects',
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'portfolios',
        loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.FREELANCER, Authority.ADMIN]
        }
      },
      {
        path: 'competences/guides',
        loadChildren: () => import('./competence-guide/competence-guide.module').then(m => m.CompetenceGuideModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.FREELANCER, Authority.ADMIN]
        }
      },
      {
        path: 'competences',
        loadChildren: () => import('./competence/competence.module').then(m => m.CompetenceModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.FREELANCER, Authority.ADMIN]
        }
      },
      {
        path: 'opportunities',
        loadChildren: () => import('./opportunity/opportunity.module').then(m => m.OpportunityModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.FREELANCER, Authority.ADMIN]
        }
      },
      {
        path: 'people',
        loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.AGENCY, Authority.ADMIN, Authority.MANAGER, Authority.VENDOR]
        }
      },
      {
        path: 'render',
        loadChildren: () => import('./render/render.module').then(m => m.RenderModule),
      },
      {
        path: 'manager',
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.ADMIN, Authority.MANAGER]
        }
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: {
          authorities: [Authority.ADMIN]
        }
      }
    ]
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pdf-test/pdf-test.module').then(m => m.PdfTestModule),
    canActivate: [AuthGuard],
    data: {
      authorities: allAuthorities,
      hideHeader: true,
      hideSubheader: true
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard],
    data: {
      authorities: [Authority.ADMIN, Authority.MANAGER]
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}

