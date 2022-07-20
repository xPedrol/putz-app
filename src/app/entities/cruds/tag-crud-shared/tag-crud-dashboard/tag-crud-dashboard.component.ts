import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {State} from '../../../../models/table/state.model';
import {TableBase} from '../../../../models/table/table-base.model';
import {ITag} from '../../../../models/tag.model';
import {queryType, TagService} from '../../../../services/tag.service';
import {HeadService} from '../../../../services/head.service';

@Component({
  selector: 'app-tag-crud-dashboard',
  templateUrl: './tag-crud-dashboard.component.html',
  styleUrls: [
    './tag-crud-dashboard.component.scss'
  ]
})
export class TagCrudDashboardComponent extends TableBase implements OnInit, OnDestroy {

  subject$: Subject<any>;
  tags: ITag[] | undefined;
  defaultListSize = 15;
  tagSearch: FormControl;
  loadingTags = false;

  constructor(
    public tagService: TagService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private headService:HeadService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.tagSearch = new FormControl();
    headService.setTitle('Tags');
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.tagSearch.valueChanges.pipe(debounceTime(500)).subscribe(value => {
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
          this.tagSearch.setValue(queryParams.search);
        }
        this.createState(queryParams);
      } else {
        this.createState();
      }
      this.getTags();
    });
    this.tagService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
    this.tagService.tags$.pipe(takeUntil(this.subject$)).subscribe(res => {
      if (res?.tags) {
        this.tags = res.tags;
      }
    });
  }

  getTags(query: any = null): void {
    this.loadingTags = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query!.page--;
    this.handleCompetences(this.tagService.queryByAdmin(query));
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
    observable.pipe(takeUntil(this.subject$)).subscribe().add(() => this.loadingTags = false);
  }


  ngOnDestroy(): void {
    this.tagService.clearTags();
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
