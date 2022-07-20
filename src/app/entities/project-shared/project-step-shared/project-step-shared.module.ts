import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProjectStepsListComponent } from './project-steps-list/project-steps-list.component';
import {DirectivesModule} from '../../../directives/directives.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { ProjectStepUpdateComponent } from './project-step-update/project-step-update.component';
import {TimeLineEventSharedModule} from '../time-line-event-shared/time-line-event-shared.module';
import { ProjectStepTimelineTestComponent } from './project-step-timeline-test/project-step-timeline-test.component';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {SharedModule} from '../../../shared/shared.module';
import { ProjectStepTableComponent } from './project-step-table/project-step-table.component';
import { ProjectStepDialogComponent } from './project-step-dialog/project-step-dialog.component';
import { ProjectStepFormComponent } from './project-step-form/project-step-form.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectItemBasicSharedModule} from "../project-item-shared/project-item-basic-shared.module";


@NgModule({
  declarations: [
    ProjectStepsListComponent,
    ProjectStepUpdateComponent,
    ProjectStepTimelineTestComponent,
    ProjectStepTableComponent,
    ProjectStepDialogComponent,
    ProjectStepFormComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    TimeLineEventSharedModule,
    SharedModule,
    DirectivesModule,
    NgbPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    ProjectItemBasicSharedModule
  ],
    exports: [
        ProjectStepsListComponent,
        ProjectStepUpdateComponent,
        ProjectStepTimelineTestComponent,
        ProjectStepTableComponent,
    ]
})
export class ProjectStepSharedModule {
}
