import {AfterContentInit, ContentChildren, Directive, Input, QueryList} from '@angular/core';
import {TableCellDirective} from './table-cell.directive';
import {ITableColumn} from '../models/table.model';

@Directive({
  selector: '[libTableRow]'
})
export class TableRowDirective implements AfterContentInit {
  columns: ITableColumn[] | undefined;
  @ContentChildren(TableCellDirective) cells: QueryList<TableCellDirective> | undefined;

  constructor() {
  }

  @Input() set libTableRow(columns: ITableColumn[] | null) {
    if (columns) {
      this.columns = columns;
    }
  }

  ngAfterContentInit(): void {
    this.cells?.forEach((cell) => {
      if (cell.name && this.findColumnByName(cell.name)) {
        cell.setView(true);
      } else {
        cell.setView(false);
      }
    });
  }

  findColumnByName(name: string): boolean {
    if (this.columns) {
      for (let column of this.columns) {
        if (column.name.toLowerCase() === name.toLowerCase() && !column.hidden) {
          return true;
        }
      }
    }
    return false;
  }

}
