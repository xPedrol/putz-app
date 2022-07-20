import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log/log.component';
import {FormsModule} from '@angular/forms';
import {NbButtonGroupModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';



@NgModule({
  declarations: [
    LogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbButtonGroupModule,
    NbSpinnerModule,
    NbInputModule
  ]
})
export class LogSharedModule { }
