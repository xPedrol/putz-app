import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  TimeLineEventListComponent
} from "../../../entities/project-shared/time-line-event-shared/time-line-event-list/time-line-event-list.component";
import {AuthGuard} from "../../../core/interceptor/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TimeLineEventListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule {
}
