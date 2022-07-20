import {SortColumn, SortDirection} from '../types/sortable.type';
import {SortEvent} from '../../directives/sortable.directive';

export interface ISort {
  column?: SortColumn;
  direction?: SortDirection;
  icon?: string;

  convertSortParams(sort: string): void;

  setSortParams(sortParams: SortEvent | null): string | undefined;

  setIcon(): void;
}

export class Sort implements ISort {
  column: SortColumn;
  direction: SortDirection;
  icon?: string;

  constructor(sortEvent: SortEvent) {
    this.column = sortEvent.column;
    this.direction = sortEvent.direction;
    this.setIcon();
  }

  convertSortParams(sort: string): void {
    if (sort) {
      const sortParams = sort.split(',');
      if (sortParams && sortParams?.length > 0) {
        this.column = sortParams[0];
        this.direction = sortParams[1] as SortDirection;
      }
    }
  }

  setSortParams(sortParams: SortEvent | null = null): string | undefined {
    if (sortParams) {
      this.column = sortParams.column;
      this.direction = sortParams.direction;
    }

    if (!this.column || !this.direction) {
      return undefined;
    }
    return `${String(this.column)},${this.direction}`;
  }

  setIcon(): void {
    switch (this.direction) {
      case 'asc':
        this.icon = 'arrow-upward-outline';
        break;
      case 'desc':
        this.icon = 'arrow-downward-outline';
        break;
      default:
        this.icon = '';
        break;
    }
  }

}
