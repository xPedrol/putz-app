import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectItemTableComponent} from './project-item-table/project-item-table.component';
import {DirectivesModule} from '../../../directives/directives.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectItemDetailComponent} from './project-item-detail/project-item-detail.component';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {OpportunityRequestDialogComponent} from '../../opportunity-shared/opportunity-request-dialog/opportunity-request-dialog.component';
import {ProjectItemCompactedCardComponent} from './project-item-compacted-card/project-item-compacted-card.component';
import {ProjectItemFormComponent} from './project-item-form/project-item-form.component';
import {ProjectItemDialogComponent} from './project-item-dialog/project-item-dialog.component';
import {NgxCurrencyModule} from 'ngx-currency';
import {SharedModule} from '../../../shared/shared.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProjectItemTableComponent,
    ProjectItemDetailComponent,
    OpportunityRequestDialogComponent,
    ProjectItemCompactedCardComponent,
    ProjectItemFormComponent,
    ProjectItemDialogComponent
  ],
  exports: [
    ProjectItemTableComponent,
    OpportunityRequestDialogComponent,
    ProjectItemCompactedCardComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    SharedModule,
    DirectivesModule,
    NgbPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ]
})
export class ProjectItemSharedModule {
}
