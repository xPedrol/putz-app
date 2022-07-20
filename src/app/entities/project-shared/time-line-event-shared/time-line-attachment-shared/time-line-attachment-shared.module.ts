import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimeLineAttachmentTableComponent} from './time-line-attachment-table/time-line-attachment-table.component';
import {DirectivesModule} from '../../../../directives/directives.module';
import {PipeModule} from '../../../../core/pipes/pipe.module';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    TimeLineAttachmentTableComponent
  ],
  exports: [
    TimeLineAttachmentTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    PipeModule
  ]
})
export class TimeLineAttachmentSharedModule {
}
