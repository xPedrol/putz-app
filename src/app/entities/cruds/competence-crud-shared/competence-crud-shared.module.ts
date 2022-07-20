import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompetenceListSharedModule} from '../../competence-shared/competence-list-shared/competence-list-shared.module';
import {CompetenceCrudDashboardComponent} from './competence-crud-dashboard/competence-crud-dashboard.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CompetenceCrudUpdateComponent} from './competence-crud-update/competence-crud-update.component';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../../shared/pagination-wrap/pagination-wrap.module';


@NgModule({
  declarations: [
    CompetenceCrudDashboardComponent,
    CompetenceCrudUpdateComponent
  ],
  imports: [
    CommonModule,
    CompetenceListSharedModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    PipeModule,
    NgbPaginationModule,
    PaginationWrapModule,
  ]
})
export class CompetenceCrudSharedModule {
}
