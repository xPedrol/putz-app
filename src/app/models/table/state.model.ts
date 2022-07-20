import {ISort, Sort} from './sort.model';
import {SortDirection} from '../types/sortable.type';
import {SortEvent} from '../../directives/sortable.directive';

export interface IState {
  page: number;
  size: number;
  searchTerm?: any;
  sort?: ISort;

  setSearchTerm(params: any): void;

  convertSortParams(sort: string): void;

  setSortParams(sortParams: SortEvent | null): string | undefined;

  getSortIcon(): string;

  get getQuery(): any;

  getQueryWithoutUndefined(params?: any): void
}

export class State implements IState {
  page: number;
  searchTerm?: any;
  size: number;
  sort?: Sort;

  constructor(state: any = null, noIndexes: boolean = false) {
    state = state ?? {};
    if (!noIndexes) {
      this.page = state.page >= 0 ? Number(state.page) : 1;
      this.size = state.size > 0 ? Number(state.size) : 20;
    }
    this.searchTerm = state.searchTerm??{};
    this.sort = new Sort({column: state.sortColumn, direction: state.sortDirection});
  }

  get getQuery() {
    return {
      page: this.page,
      size: this.size,
      sort: this.sort?.setSortParams(),
      ...this.searchTerm
    };
  }

  getQueryWithoutUndefined(params?: any): any {
    params = params ?? this.getQuery;
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });
    return params;
  }

  setSearchTerm(params: any): void {
    const exceptions: any[] = ['page', 'sort', 'size'];
    this.searchTerm = {};
    if (params) {
      const newParams: any = {};
      Object.keys(params).forEach((key) => {
        if (!exceptions.includes(key)) {
          newParams[key] = params[key];
        }
      });
      this.searchTerm = newParams;
    }
  }


  convertSortParams(sort: string): void {
    if (sort) {
      const sortParams = sort.split(',');
      if (sortParams && sortParams?.length > 0) {
        this.sort!.column = sortParams[0];
        this.sort!.direction = sortParams[1] as SortDirection;
      }
    }
  }

  setSortParams(sortParams: SortEvent | null = null): string | undefined {
    if (sortParams) {
      this.sort!.column = sortParams.column;
      this.sort!.direction = sortParams.direction;
    }

    if (!this.sort!.column || !this.sort!.direction) {
      return undefined;
    }
    return `${String(this.sort!.column)},${this.sort!.direction}`;
  }

  getSortIcon(): string {
    switch (this.sort!.direction) {
      case 'asc':
        return 'arrow-upward-outline';
      case 'desc':
        return 'arrow-downward-outline';
      default:
        return '';
    }
  }


}
