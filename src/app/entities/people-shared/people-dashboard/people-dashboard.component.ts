import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbMenuService} from '@nebular/theme';
import {debounceTime, filter, map, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {IPerson} from '../../../models/person.model';
import {personRoles} from '../../../constants/authority.constants';
import {PersonService, queryType} from '../../../services/person.service';
import {FormControl} from '@angular/forms';
import {IState, State} from '../../../models/table/state.model';
import {HeadService} from '../../../services/head.service';
import {TableBase} from "../../../models/table/table-base.model";

@Component({
  selector: 'app-people-dashboard',
  templateUrl: './people-dashboard.component.html',
  styleUrls: [
    './people-dashboard.component.scss'
  ]
})
export class PeopleDashboardComponent extends TableBase implements OnInit, OnDestroy {
  @Input() queryParam = true;
  personRole: string = 'all';
  personRoles = personRoles;
  people: IPerson[] | undefined;
  defaultTableSize = 15;
  peopleSearch: FormControl;
  state: IState | undefined;
  subject$ = new Subject();
  isLoading = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public personService: PersonService,
    private nbMenuService: NbMenuService,
    public router: Router,
    private headService: HeadService
  ) {
    super(router,activatedRoute)
    this.peopleSearch = new FormControl();
    this.headService.setTitle('Clientes');
  }

  ngOnInit(): void {
    this.createState();
    this.peopleSearch.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe(value => {
      if (this.state) {
        this.state.page = 1;
        this.state.searchTerm = {...this.state.searchTerm, ...{search: value ?? ''}};
        this.handleNavigation(this.state.getQuery);
      }
    });
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.personRole = queryParams!.person_role ? String(queryParams!.person_role).toUpperCase() : 'all';
      this.createState(queryParams);
      if (this.state?.searchTerm['search']) {
        this.peopleSearch.setValue(this.state.searchTerm['search'], {emitEvent: false});
      }
      this.getPersons(null, !this.personService.people$.getValue()?.people);
    });
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'person-roles-items'),
        // @ts-ignore
        map(({item: {id}}) => id),
      )
      .subscribe(id => {
        const role = String(id).toLowerCase();
        this.createState({...this.state?.getQuery, ...{person_role: role}});
        this.router.navigate([`/people/dashboard`], {queryParams: this.state?.getQuery});
      });
    this.personService.people$.pipe(takeUntil(this.subject$)).subscribe((req) => {
      if (req?.people) {
        this.people = req.people;
      }
    });
  }

  getPersons(query: any = null, withLoading?: boolean): void {
    if (!query) {
      query = this.state?.getQuery;
    }
    query.page--;
    if (withLoading) {
      this.isLoading = true;
    }
    this.personHandle(this.personService.query(this.personRole, query));
  }


  personHandle(observable: Observable<queryType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe(
      ()=>{
        this.listTotalSize=this.personService.totalCount$.getValue()
      }
      // {
      //   next: ({people, headers}) => {
      //     this.people = people || [];
      //     this.personService.totalCount$.next(Number(headers.get('X-Total-Count')));
      //   }
      // }
    ).add(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
    this.personService.clearPersons();
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State({page: 1, size: this.defaultTableSize});
    }
    this.defaultTableSize = this.state?.size;
  }

  handleNavigation(params: any = null): void {
    this.router.navigate([`people/dashboard`], {queryParams: params});
  }

  pageChange(event: number): void {
    this.state!.page = event;
    this.handleNavigation(this.state?.getQuery);
  }

  sizeChange(event: number): void {
    this.state!.size = event;
    this.handleNavigation(this.state?.getQuery);
  }

  onSort(event: any) {
    this.state!.sort = event;
    this.handleNavigation(this.state?.getQuery);
  }
}
