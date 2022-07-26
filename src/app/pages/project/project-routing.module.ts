import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDashboardComponent} from '../../entities/project-shared/project-dashboard/project-dashboard.component';
import {AuthGuard} from '../../core/interceptor/auth-guard.service';
import {allAuthorities, Authority} from '../../constants/authority.constants';
import {ProjectUpdateComponent} from '../../entities/project-shared/project-update/project-update.component';
import {
  ProjectGeneralTabComponent
} from '../../entities/project-shared/project-update-tabs/project-general-tab/project-general-tab.component';
import {
  ProjectScheduleTabComponent
} from '../../entities/project-shared/project-update-tabs/project-schedule-tab/project-schedule-tab.component';
import {
  ProjectItemTabComponent
} from '../../entities/project-shared/project-update-tabs/project-item-tab/project-item-tab.component';
import {
  ProjectConceptionTabComponent
} from '../../entities/project-shared/project-update-tabs/project-conception-tab/project-conception-tab.component';

import {
  ProjectItemRequestTabComponent
} from '../../entities/project-shared/project-update-tabs/project-item-request-tab/project-item-request-tab.component';
import {ProjectTabAuthGuard} from '../../core/interceptor/project-tab-auth-guard.service';
import {
  ProjectNoAccessTabComponent
} from '../../entities/project-shared/project-update-tabs/project-no-access-tab/project-no-access-tab.component';
import {
  ProjectContractTabComponent
} from '../../entities/project-shared/project-update-tabs/project-contract-tab/project-contract-tab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ProjectDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: allAuthorities
    }
  },
  {
    path: ':projectId/timeline',
    loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule),
    canActivate: [AuthGuard],
    data: {
      authorities: allAuthorities
    }
  },
  {
    path: ':projectId',
    component: ProjectUpdateComponent,
    canActivate: [AuthGuard],
    canActivateChild: [ProjectTabAuthGuard],
    data: {
      authorities: [Authority.VENDOR, Authority.ADMIN, Authority.MANAGER, Authority.AGENCY]
    },
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full'
      },
      {
        path: 'initial',
        redirectTo: 'general',
        pathMatch: 'full'
        // component: ProjectInitialTabComponent
      },
      {
        path: 'general',
        component: ProjectGeneralTabComponent
      },
      {
        path: 'schedules',
        component: ProjectScheduleTabComponent
      },
      {
        path: 'contract',
        component: ProjectContractTabComponent
      },
      {
        path: 'items',
        component: ProjectItemTabComponent
      },
      {
        path: 'items/requests',
        component: ProjectItemRequestTabComponent
      },
      {
        path: 'conception',
        component: ProjectConceptionTabComponent
      },
      {
        path: 'no-access',
        component: ProjectNoAccessTabComponent,
      }
    ]
  },
  {
    path: ':projectId/render',
    canActivate: [AuthGuard],
    data: {
      authorities: [Authority.CLIENT, Authority.MANAGER, Authority.ADMIN]
    },
    loadChildren: () => import('./render/render.module').then(m => m.RenderModule)
  },
  {
    path: ':projectId/items',
    loadChildren: () => import('../project-item/project-item.module').then(m => m.ProjectItemModule),
    canActivate: [AuthGuard],
    data: {
      authorities: allAuthorities
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
