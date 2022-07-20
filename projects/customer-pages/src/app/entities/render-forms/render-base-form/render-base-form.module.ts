import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RenderBaseFormComponent} from './render-base-form.component';



@NgModule({
  declarations: [RenderBaseFormComponent],
  exports: [RenderBaseFormComponent],
  imports: [
    CommonModule
  ]
})
export class RenderBaseFormModule { }
