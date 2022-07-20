import { NgModule } from '@angular/core';
import {SafePipe} from './safe.pipe';
import { EmptyPipe } from './empty.pipe';
import { ConvertPipe } from './convert.pipe';
import { MomentToDatePipe } from './moment-to-date.pipe';
import { HasAccessPipe } from './has-access.pipe';
import { AttachmentTypePipe } from './attachment-type.pipe';


@NgModule({
  declarations: [
    SafePipe,
    EmptyPipe,
    ConvertPipe,
    MomentToDatePipe,
    HasAccessPipe,
    AttachmentTypePipe
  ],
  exports: [
    SafePipe,
    EmptyPipe,
    ConvertPipe,
    MomentToDatePipe,
    HasAccessPipe,
    AttachmentTypePipe
  ]
})
export class PipeModule { }
