import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectivesModule} from '../../../directives/directives.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectItemDetailComponent} from './project-item-detail/project-item-detail.component';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {
  OpportunityRequestDialogComponent
} from '../../opportunity-shared/opportunity-request-dialog/opportunity-request-dialog.component';
import {ProjectItemFormComponent} from './project-item-form/project-item-form.component';
import {ProjectItemUpdateDialogComponent} from './project-item-update-dialog/project-item-update-dialog.component';
import {NgxCurrencyModule} from 'ngx-currency';
import {SharedModule} from '../../../shared/shared.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectItemBasicSharedModule} from "./project-item-basic-shared.module";


@NgModule({
  declarations: [
    ProjectItemDetailComponent,
    OpportunityRequestDialogComponent,
    ProjectItemFormComponent,
    ProjectItemUpdateDialogComponent
  ],
  exports: [
    OpportunityRequestDialogComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    SharedModule,
    DirectivesModule,
    NgbPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    ProjectItemBasicSharedModule
  ]
})
export class ProjectItemSharedModule {
}
