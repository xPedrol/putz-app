import {Injectable} from '@angular/core';
import {IState, State} from '../models/table/state.model';
import {BehaviorSubject} from 'rxjs';
import {SortEvent} from '../directives/sortable.directive';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  state$: BehaviorSubject<IState>;
  totalCount$: BehaviorSubject<number>;

  constructor() {
    this._state = new State({
      page: 1,
      size: 5,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    });
    this.state$ = new BehaviorSubject<IState>(this._state);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  _state: IState;

  get state() {
    return this._state;
  }

  set state(state: IState) {
    this._state = state;
    this.updateStateSubject();
  }

  _totalCount = 0;

  get totalCount() {
    return this._totalCount;
  }

  set totalCount(total: number) {
    this._totalCount = total;
    this.totalCount$.next(this._totalCount);
  }

  updateStateSubject(): void {
    this.state$.next(this._state);
  }

  pageChange(event: number): void {
    this.state.page = event;
    this.updateStateSubject();
  }

  sizeChange(event: number): void {
    this.state.size = event;
    this.updateStateSubject();
  }

  onSort(sortEvent: SortEvent) {
    this.state.setSortParams(sortEvent);
    this.updateStateSubject();
  }

  clearAll(): void {
    this.state = new State({
      page: 1,
      size: 5,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    });
    this.totalCount = 0;
  }
}
