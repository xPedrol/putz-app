import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {TableBase} from "../../../models/table/table-base.model";
import {ActivatedRoute, Router} from "@angular/router";
import {State} from "../../../models/table/state.model";
import {ProjectRenderService} from "../../../services/project-render.service";
import {FormControl} from "@angular/forms";
import {debounceTime, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {deleteAllUndefinedFields} from "../../../core/utils/deleteField";
import {IProjectRenderGroupName} from "../../../models/project-render-group-name.model";
import {ProjectRenderGroupNameRecordStatusEnum} from "../../../constants/project-render-group-name-record-status.constants";

@Component({
  selector: 'app-approved-names-dialog',
  templateUrl: './approved-names-dialog.component.html',
  styleUrls: ['./approved-names-dialog.component.scss']
})
export class ApprovedNamesDialogComponent extends TableBase implements OnInit, OnDestroy {
  defaultListSize = 20;
  projectRenderSyncNames: IProjectRenderGroupName[];
  approvedNames: string[];
  renderSlug: string;
  peopleSearch: FormControl;
  subject$: Subject<any>;
  nameStatusEnum = ProjectRenderGroupNameRecordStatusEnum;
  constructor(
    private dialogRef: NbDialogRef<ApprovedNamesDialogComponent>,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private projectRenderService: ProjectRenderService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject();
    this.peopleSearch = new FormControl();
    this.state = new State();
  }

  ngOnInit(): void {
    if (!this.projectRenderSyncNames) {
      this.getApprovedNamesByRenderSlug();
      this.peopleSearch.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe(value => {
        this.state.page = 1;
        this.state.searchTerm['search'] = value;
        deleteAllUndefinedFields(this.state.searchTerm);
        this.getApprovedNamesByRenderSlug(this.state.getQuery);
      });
    }
  }

  getApprovedNamesByRenderSlug(req?: any): void {
    if (req) {
      req['page']--;
    }
    if (this.renderSlug) {
      this.projectRenderService.getAllNamesApprovedByRenderSlug(this.renderSlug, req).pipe(takeUntil(this.subject$)).subscribe(({
                                                                                                                                  body,
                                                                                                                                  headers
                                                                                                                                }) => {
        this.approvedNames = body;
        this.listTotalSize = Number(headers.get('X-Total-Count'));
      });
    }
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

  close(res?: any) {
    this.dialogRef.close(res);
  }

  trackApprovedNamesByFn(index: number, item: string) {
    return item;
  }

  pageChange(event: number): void {
    if (this.state) {
      this.state!.page = event;
      const m = (this.state.page - 1) * this.state.size;
      if (m >= 0 && m <= this.listTotalSize) {
        this.getApprovedNamesByRenderSlug(this.state.getQuery);
      }
    }
  }

  sizeChange(event: number): void {
    if (this.state) {
      this.state.size = event;
      // const m = this.state.page * this.state.size;
      // if (m >= 0 && m < this.listTotalSize) {
      this.getApprovedNamesByRenderSlug(this.state.getQuery);
      // }
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
