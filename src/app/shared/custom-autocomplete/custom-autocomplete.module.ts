import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from './custom-autocomplete/custom-autocomplete.component';
import {NbCardModule, NbOptionModule, NbOverlayModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CustomAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbOverlayModule,
    NbCardModule,
    NbOptionModule,
  ],
  exports:[
    CustomAutocompleteComponent
  ]
})
export class CustomAutocompleteModule { }
