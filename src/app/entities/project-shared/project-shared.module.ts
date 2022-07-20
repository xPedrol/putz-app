import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectivesModule} from '../../directives/directives.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectDashboardComponent} from './project-dashboard/project-dashboard.component';
import {ProjectUpdateComponent} from './project-update/project-update.component';
import {ProjectItemSharedModule} from './project-item-shared/project-item-shared.module';
import {ProjectConceptionFormComponent} from './forms/project-conception-form/project-conception-form.component';
import {ProjectStepSharedModule} from './project-step-shared/project-step-shared.module';
import {PipeModule} from '../../core/pipes/pipe.module';
import {RenderSharedModule} from '../render-shared/render-shared.module';
import {ProjectBudgetSummaryComponent} from './budget-summary/project-budget-summary.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxMaskModule} from 'ngx-mask';
import {ProjectSelectModelDialogComponent} from './project-select-model-dialog/project-select-model-dialog.component';
import {ProjectInitialTabComponent} from './project-update-tabs/initial-tab/project-initial-tab.component';
import {ProjectGeneralTabComponent} from './project-update-tabs/project-general-tab/project-general-tab.component';
import {ProjectScheduleTabComponent} from './project-update-tabs/project-schedule-tab/project-schedule-tab.component';
import {ProjectItemTabComponent} from './project-update-tabs/project-item-tab/project-item-tab.component';
import {
  ProjectConceptionTabComponent
} from './project-update-tabs/project-conception-tab/project-conception-tab.component';
import {ProjectResumeComponent} from './project-resume/project-resume.component';
import {ProjectListMethodsComponent} from './lists/project-list-methods/project-list-methods.component';
import {ProjectTableComponent} from './lists/project-table/project-table.component';
import {ProjectAccordionComponent} from './lists/project-accordion/project-accordion.component';
import {
  ProjectItemRequestTabComponent
} from './project-update-tabs/project-item-request-tab/project-item-request-tab.component';
import {OpportunitySharedModule} from '../opportunity-shared/opportunity-shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectNoAccessTabComponent} from './project-update-tabs/project-no-access-tab/project-no-access-tab.component';
import {
  ProjectConceptionCardComponent
} from './budget-summary/project-conception-card/project-conception-card.component';
import {PersonBasicSharedModule} from '../people-shared/person-basic-shared/person-basic-shared.module';
import {BreadcrumbModule} from '../../shared/breadcrumb/breadcrumb.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../shared/pagination-wrap/pagination-wrap.module';
import { ProjectContractUploadFormComponent } from './forms/project-contract-upload-form/project-contract-upload-form.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { ProjectContractTabComponent } from './project-update-tabs/project-contract-tab/project-contract-tab.component';
import {ProjectGeneralFormComponent} from "./forms/project-general-form/project-general-form.component";


@NgModule({
  declarations: [
    ProjectTableComponent,
    ProjectGeneralFormComponent,
    ProjectDashboardComponent,
    ProjectUpdateComponent,
    ProjectConceptionFormComponent,
    ProjectAccordionComponent,
    ProjectBudgetSummaryComponent,
    ProjectSelectModelDialogComponent,
    ProjectInitialTabComponent,
    ProjectGeneralTabComponent,
    ProjectScheduleTabComponent,
    ProjectItemTabComponent,
    ProjectConceptionTabComponent,
    ProjectResumeComponent,
    ProjectListMethodsComponent,
    ProjectItemRequestTabComponent,
    ProjectNoAccessTabComponent,
    ProjectConceptionCardComponent,
    ProjectContractUploadFormComponent,
    ProjectContractTabComponent
  ],
    imports: [
        CommonModule,
        DirectivesModule,
        PipeModule,
        RouterModule,
        ReactiveFormsModule,
        ProjectItemSharedModule,
        ProjectStepSharedModule,
        RenderSharedModule,
        SharedModule,
        NgxMaskModule,
        TranslateModule,
        OpportunitySharedModule,
        PersonBasicSharedModule,
        BreadcrumbModule,
        NgbPaginationModule,
        PaginationWrapModule,
        NgxDropzoneModule
    ],
  exports: [
    ProjectTableComponent,
    ProjectGeneralFormComponent,
    ProjectDashboardComponent,
    ProjectUpdateComponent,
  ]
})
export class ProjectSharedModule {
}
