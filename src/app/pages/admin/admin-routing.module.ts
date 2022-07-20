import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'competences',
    loadChildren: () => import('./competence-admin/competence-admin.module').then(m => m.CompetenceAdminModule),
  },
  {
    path: 'competences/guides',
    loadChildren: () => import('./competence-guide-admin/competence-guide-admin.module').then(m => m.CompetenceGuideAdminModule),
  },
  {
    path: 'tags',
    loadChildren: () => import('./tag-admin/tag-admin.module').then(m => m.TagAdminModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./product-admin/product-admin.module').then(m => m.ProductAdminModule),
  },
  {
    path: 'project/cases',
    loadChildren: () => import('./project-case-admin/project-case-admin.module').then(m => m.ProjectCaseAdminModule),
  },
  {
    path: 'metrics',
    loadChildren: () => import('./metric/metric.module').then(m => m.MetricModule),
  },
  {
    path: 'logs',
    loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./config/config.module').then(m => m.ConfigModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
