import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CompetenceGuideCrudDashboardComponent
} from './competence-guide-crud-dashboard/competence-guide-crud-dashboard.component';
import {
  CompetenceGuideCrudUpdateComponent
} from './competence-guide-crud-update/competence-guide-crud-update.component';
import {SharedModule} from '../../../shared/shared.module';
import {
  CompetenceGuideCrudListSharedModule
} from './competence-guide-crud-list-shared/competence-guide-crud-list-shared.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../../shared/pagination-wrap/pagination-wrap.module';


@NgModule({
  declarations: [
    CompetenceGuideCrudDashboardComponent,
    CompetenceGuideCrudUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CKEditorModule,
    CompetenceGuideCrudListSharedModule,
    RouterModule,
    ReactiveFormsModule,
    PipeModule,
    TranslateModule,
    NgxDropzoneModule,
    FormsModule,
    NgbPaginationModule,
    PaginationWrapModule
  ]
})
export class CompetenceGuideCrudSharedModule {
}
