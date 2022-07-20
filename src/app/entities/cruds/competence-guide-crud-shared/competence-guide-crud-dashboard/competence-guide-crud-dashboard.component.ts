import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {State} from '../../../../models/table/state.model';
import {TableBase} from '../../../../models/table/table-base.model';
import {CompetenceGuideService, queryType} from '../../../../services/competence-guide.service';
import {ICompetenceGuide} from '../../../../models/competence-guide.model';
import {SharedService} from '../../../../shared/shared.service';

@Component({
  selector: 'app-competence-guide-crud-dashboard',
  templateUrl: './competence-guide-crud-dashboard.component.html',
  styleUrls: ['./competence-guide-crud-dashboard.component.scss']
})
export class CompetenceGuideCrudDashboardComponent extends TableBase implements OnInit,OnDestroy {
  subject$: Subject<any>;
  competenceGuides: ICompetenceGuide[] | undefined;
  defaultListSize = 15;
  competenceGuideSearch: FormControl;
  loadingCompetenceGuides = false;

  constructor(
    public competenceGuideService: CompetenceGuideService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private sharedFunctions:SharedService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.competenceGuideSearch = new FormControl();
    sharedFunctions.setPageData('Guias de Competência');
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.competenceGuideSearch.valueChanges.pipe(debounceTime(500)).subscribe(value => {
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
          this.competenceGuideSearch.setValue(queryParams.search);
        }
        this.createState(queryParams);
      } else {
        this.createState();
      }
      this.getCompetences();
    });
    this.competenceGuideService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
    this.competenceGuideService.competenceGuides$.pipe(takeUntil(this.subject$)).subscribe(res => {
      if (res?.competenceGuides) {
        this.competenceGuides = res.competenceGuides;
      }
    });
  }

  getCompetences(query: any = null): void {
    this.loadingCompetenceGuides = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query!.page--;
    this.handleCompetences(this.competenceGuideService.queryByAdmin(query));
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params)
      // if(params?.['name.contains']) {
      //   this.state.searchTerm = {'name.contains': params?.['name.contains'] ?? ''};
      // }
    } else {
      this.state = new State({page: 1, size: this.defaultListSize});
    }
    this.defaultListSize = this.state?.size;
  }

  handleCompetences(observable: Observable<queryType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe().add(() => this.loadingCompetenceGuides = false);
  }


  ngOnDestroy(): void {
    this.competenceGuideService.clearCompetenceGuides();
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
