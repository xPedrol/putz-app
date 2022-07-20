import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbdSortableHeader} from './sortable.directive';
import {TableRowDirective} from './table-row.directive';
import {TableCellDirective} from './table-cell.directive';
import { HasAccessDirective } from './has-access.directive';


@NgModule({
  declarations: [NgbdSortableHeader, TableRowDirective, TableCellDirective, HasAccessDirective
  ],
  imports: [
    CommonModule
  ],
    exports: [
        NgbdSortableHeader,
        TableRowDirective,
        TableCellDirective,
        HasAccessDirective
    ]
})
export class DirectivesModule {
}
