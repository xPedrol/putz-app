import {Component, OnInit} from '@angular/core';
import {ITableColumn} from '../../../models/table.model';

@Component({
  selector: 'app-table-base',
  template: ''
})
export class TableBaseComponent implements OnInit {
  columns: ITableColumn[] | null;

  constructor() {
    this.columns = null;
  }

  ngOnInit(): void {
  }

  isVisible(cellName: string): boolean {
    if (this.columns && this.columns?.length > 0) {
      return this.columns?.some(column => {
        if (column) {
          return column.name?.toLowerCase() === cellName?.toLowerCase();
        }
        return false;
      });
    }
    return false;
  }

}
