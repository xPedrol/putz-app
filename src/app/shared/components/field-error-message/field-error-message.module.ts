import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorMessageComponent } from './field-error-message/field-error-message.component';



@NgModule({
    declarations: [
        FieldErrorMessageComponent
    ],
    exports: [
        FieldErrorMessageComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FieldErrorMessageModule { }
