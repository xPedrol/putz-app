import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from './nebular-components/nebular.module';
import {ComponentsModule} from './components/components.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NebularModule
  ],
  exports:[
    ComponentsModule,
    NebularModule
  ]
})
export class SharedModule { }
