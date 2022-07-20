import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompetenceGuideListComponent} from './competence-guide-list/competence-guide-list.component';
import {RouterModule} from '@angular/router';
import {CompetenceGuideDetailComponent} from './competence-guide-detail/competence-guide-detail.component';
import {CompetenceGuideDashboardComponent} from './competence-guide-dashboard/competence-guide-dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../core/pipes/pipe.module';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../shared/pagination-wrap/pagination-wrap.module';


@NgModule({
  declarations: [
    CompetenceGuideListComponent,
    CompetenceGuideDetailComponent,
    CompetenceGuideDashboardComponent,
  ],
  exports: [
    CompetenceGuideListComponent,
    CompetenceGuideDetailComponent,
    CompetenceGuideDashboardComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    NgbPaginationModule,
    PaginationWrapModule
  ]
})
export class CompetenceGuideSharedModule {
}
