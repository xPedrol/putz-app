import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ICompetence} from '../../../../models/competence.model';
import {FormControl} from '@angular/forms';
import {CompetenceService, queryType} from '../../../../services/competence.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {State} from '../../../../models/table/state.model';
import {TableBase} from '../../../../models/table/table-base.model';
import {SharedService} from '../../../../shared/shared.service';

@Component({
  selector: 'app-competence-crud-dashboard',
  templateUrl: './competence-crud-dashboard.component.html',
  styleUrls: [
    './competence-crud-dashboard.component.scss'
  ]
})
export class CompetenceCrudDashboardComponent extends TableBase implements OnInit, OnDestroy {
  subject$: Subject<any>;
  competences: ICompetence[] | undefined;
  defaultListSize = 15;
  competenceSearch: FormControl;
  loadingCompetences = false;

  constructor(
    public competenceService: CompetenceService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private sharedFunctions: SharedService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.competenceSearch = new FormControl();
    sharedFunctions.setPageData('Competências');
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.competenceSearch.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (this.state && this.state.searchTerm?.['name.contains'] !== value) {
        if (value) {
          this.state.searchTerm = {'name.contains': value};
        } else {
          this.state.searchTerm = undefined;
        }
        this.handleNavigation(this.state.getQuery);
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams?.size && queryParams?.page) {
        if (queryParams?.search) {
          this.competenceSearch.setValue(queryParams.search);
        }
        this.createState(queryParams);
      } else {
        this.createState();
      }
      this.getCompetences();
    });
    this.competenceService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
    this.competenceService.competences$.pipe(takeUntil(this.subject$)).subscribe(res => {
      if (res?.competences) {
        this.competences = res.competences;
      }
    });
  }

  getCompetences(query: any = null): void {
    this.loadingCompetences = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query!.page--;
    this.handleCompetences(this.competenceService.queryAdmin(query));
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State({page: 1, size: this.defaultListSize});
    }
    this.defaultListSize = this.state?.size;
  }

  handleCompetences(observable: Observable<queryType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe().add(() => this.loadingCompetences = false);
  }


  ngOnDestroy(): void {
    this.competenceService.clearCompetences();
    this.subject$.next(null);
    this.subject$.complete();
  }

  pageChange(event: number): void {
    this.state!.page = event;
    this.handleNavigation(this.state?.getQuery);
  }

  sizeChange(event: number): void {
    this.state!.size = event;
    this.handleNavigation(this.state?.getQuery);
  }


}
