import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {TimelineEventComponent} from './time-line-event/timeline-event.component';
import {TimeLineEventListComponent} from './time-line-event-list/time-line-event-list.component';
import {RouterModule} from '@angular/router';
import {
  TimeLineEventUpdateDialogComponent
} from './time-line-event-update-dialog/time-line-event-update-dialog.component';
import {TimeLineEventUpdateFormComponent} from './time-line-event-update-form/time-line-event-update-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {TimeLineAttachmentSharedModule} from './time-line-attachment-shared/time-line-attachment-shared.module';
import {TimeLineProjectStepComponent} from './time-line-project-step/time-line-project-step.component';
import {TimeLineEventCardComponent} from './time-line-event-card/time-line-event-card.component';
import {TimeLineEventCardCommentComponent} from './time-line-event-card-comment/time-line-event-card-comment.component';
import {
  TimeLineEventCardAttachmentComponent
} from './time-line-event-card-attachment/time-line-event-card-attachment.component';
import {NbChatModule} from '@nebular/theme';
import {SharedModule} from '../../../shared/shared.module';
import {TimeLineProjectStepCardComponent} from './time-line-project-step-card/time-line-project-step-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {
  TimeLineEventEvaluationDialogComponent
} from './time-line-event-evaluation-dialog/time-line-event-evaluation-dialog.component';
import {DirectivesModule} from '../../../directives/directives.module';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TimelineEventComponent,
    TimeLineEventListComponent,
    TimeLineEventUpdateDialogComponent,
    TimeLineEventUpdateFormComponent,
    TimeLineProjectStepComponent,
    TimeLineEventCardComponent,
    TimeLineEventCardCommentComponent,
    TimeLineEventCardAttachmentComponent,
    TimeLineProjectStepCardComponent,
    TimeLineEventEvaluationDialogComponent
  ],
  imports: [
    CommonModule,
    TimeLineAttachmentSharedModule,
    PipeModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    // ChatMessageModule,
    NbChatModule,
    TranslateModule,
    DirectivesModule,
    NgbRatingModule,
    // NgbRatingModule
  ],
  exports: [
    TimelineEventComponent,
    TimeLineEventListComponent,
    TimeLineEventUpdateDialogComponent,
    TimeLineEventUpdateFormComponent
  ],
  entryComponents: [
    TimeLineEventUpdateDialogComponent
  ]
})
export class TimeLineEventSharedModule {
}
