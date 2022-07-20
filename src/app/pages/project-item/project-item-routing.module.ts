import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectItemDetailComponent} from '../../entities/project-shared/project-item-shared/project-item-detail/project-item-detail.component';

const routes: Routes = [
  {
    path: ':projectItemId',
    component: ProjectItemDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectItemRoutingModule {
}
