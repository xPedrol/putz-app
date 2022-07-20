import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpportunityDashboardComponent} from './opportunity-dashboard/opportunity-dashboard.component';
import {OpportunityListComponent} from './opportunity-list/opportunity-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {OpportunityOpenedRequestsComponent} from './opportunity-opened-requests/opportunity-opened-requests.component';
import {ProjectItemSharedModule} from '../project-shared/project-item-shared/project-item-shared.module';
import {PipeModule} from '../../core/pipes/pipe.module';
import { OpportunityDetailComponent } from './opportunity-detail/opportunity-detail.component';
import {SharedModule} from '../../shared/shared.module';
import { OpportunityTableComponent } from './opportunity-table/opportunity-table.component';
import {DirectivesModule} from '../../directives/directives.module';
import { OpportunityMethodsListComponent } from './opportunity-methods-list/opportunity-methods-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../shared/pagination-wrap/pagination-wrap.module';
import {ProjectItemBasicSharedModule} from "../project-shared/project-item-shared/project-item-basic-shared.module";


@NgModule({
  declarations: [
    OpportunityDashboardComponent,
    OpportunityListComponent,
    OpportunityOpenedRequestsComponent,
    OpportunityDetailComponent,
    OpportunityTableComponent,
    OpportunityMethodsListComponent
  ],
    imports: [
        CommonModule,
        PipeModule,
        ProjectItemSharedModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        DirectivesModule,
        NgbPaginationModule,
        PaginationWrapModule,
        ProjectItemBasicSharedModule
    ],
  exports: [
    OpportunityDashboardComponent,
    OpportunityListComponent,
    OpportunityOpenedRequestsComponent,
    OpportunityDetailComponent,
    OpportunityTableComponent
  ]
})
export class OpportunitySharedModule {
}
