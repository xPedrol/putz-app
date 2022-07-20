import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonTableComponent} from './people-table/person-table.component';
import {DirectivesModule} from '../../directives/directives.module';
import {RouterModule} from '@angular/router';
import {PipeModule} from '../../core/pipes/pipe.module';
import {PeopleDashboardComponent} from './people-dashboard/people-dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {PeopleDetailComponent} from './people-detail/people-detail.component';
import {AccountSharedModule} from '../account-shared/account-shared.module';
import {UserSharedModule} from '../user-shared/user-shared.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from "../../shared/pagination-wrap/pagination-wrap.module";


@NgModule({
  declarations: [
    PersonTableComponent,
    PeopleDashboardComponent,
    PeopleDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    PipeModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    AccountSharedModule,
    RouterModule,
    UserSharedModule,
    PaginationWrapModule
  ],
  exports: [
    PersonTableComponent,
    PeopleDashboardComponent,
    PeopleDetailComponent
  ]
})
export class PersonSharedModule {
}
