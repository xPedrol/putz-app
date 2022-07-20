import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationWrapperComponent } from './pagination-wrapper/pagination-wrapper.component';



@NgModule({
    declarations: [
        PaginationWrapperComponent
    ],
    exports: [
        PaginationWrapperComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PaginationWrapModule { }
