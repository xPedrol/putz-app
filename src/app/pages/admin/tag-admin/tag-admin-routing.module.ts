import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  TagCrudDashboardComponent
} from '../../../entities/cruds/tag-crud-shared/tag-crud-dashboard/tag-crud-dashboard.component';
import {
  TagCrudUpdateComponent
} from '../../../entities/cruds/tag-crud-shared/tag-crud-update/tag-crud-update.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: TagCrudDashboardComponent
  },
  {
    path: 'new',
    component: TagCrudUpdateComponent
  },
  {
    path: ':tagId/update',
    component: TagCrudUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagAdminRoutingModule { }
