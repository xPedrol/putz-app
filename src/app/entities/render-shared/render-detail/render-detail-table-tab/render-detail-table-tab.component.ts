import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {TableBase} from "../../../../models/table/table-base.model";
import {ActivatedRoute, Router} from "@angular/router";
import {map, takeUntil} from "rxjs/operators";
import {ProjectRenderItemService} from "../../../../services/project-render-item.service";
import {IState, State} from "../../../../models/table/state.model";
import {IProjectRenderItemStatus} from "../../../../models/enums/project-render-item-status.model";
import {Subject} from "rxjs";
import {IProject} from "../../../../models/project.model";
import {ProjectService} from "../../../../services/project.service";
import {IProjectRenderItem} from "../../../../models/project-render-item.model";
import {
  RenderDetailFilterDialogComponent
} from "../../render-detail-filter-dialog/render-detail-filter-dialog.component";
import {
  RenderExportCsvConfirmDialogComponent
} from "../../render-export-csv-confirm-dialog/render-export-csv-confirm-dialog.component";
import {Papa} from "ngx-papaparse";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import * as moment from "moment";
import {DATE_FORMAT} from "../../../../config/input.constants";
import {isPlatformBrowser} from "@angular/common";
import {RenderDetailService} from "../render-detail.service";

@Component({
  selector: 'app-render-detail-table-tab',
  templateUrl: './render-detail-table-tab.component.html',
  styleUrls: ['./render-detail-table-tab.component.scss']
})
export class RenderDetailTableTabComponent extends TableBase implements OnInit,OnDestroy {
  subject$: Subject<any>;
  project: IProject | undefined;
  listSize = 20;
  renderItems: IProjectRenderItem[] | undefined;
  isLoading = true;
  exportingCsv = false;
  isBrowser;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private projectRenderItemService: ProjectRenderItemService,
    private projectService: ProjectService,
    private papa: Papa,
    private dialogService: NbDialogService,
    private toastService: NbToastrService,
    @Inject(PLATFORM_ID) platformId: string,
    private renderDetailService: RenderDetailService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.project) {
        this.createState(params);
        this.getRenderItems();
      }
    });
    this.projectRenderItemService.totalCount$.pipe(takeUntil(this.subject$)).subscribe((total) => {
      this.listTotalSize = total ?? 0;
    });
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        this.createState(this.activatedRoute.snapshot.queryParams);
        this.getRenderItems();
        this.getRenderItems();
      }
    });
    this.renderDetailService.renderDetailData$.pipe(takeUntil(this.subject$)).subscribe(data => {
      if (data) {
        switch (data) {
          case 'getRenderItems':
            this.createState();
            this.getRenderItems();
            break;
          case 'openConfirmExportSize':
            this.openConfirmExportSize();
            break;
          case 'openFilterDialog':
            this.openFilterDialog()
            break;
        }
      }
    })
  }

  createState(params: any = null): void {
    if (params && Object.keys(params).length > 0) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
      if (this.state?.size) {
        this.listSize = this.state?.size;
      }
    } else {
      this.state = new State({page: 1, size: this.listSize});
    }
  }

  getRenderItems(query?: any): void {
    this.isLoading = true;
    const ids = {
      projectId: this.project?.id,
      renderId: this.project?.projectRenderId
    };
    if (!query) {
      query = this.state?.getQuery;
    }
    query.page--;
    this.projectRenderItemService.queryByRenderId(ids, query, false).pipe(takeUntil(this.subject$), map((res) => {
      const items = res?.projectRenderItems;
      items?.forEach(item => {
        const statusExceptions: IProjectRenderItemStatus[] = [IProjectRenderItemStatus.FINISHED];
        if (item?.renderUid && item.renderStatus && !statusExceptions.includes(<IProjectRenderItemStatus>String(item.renderStatus))) {
          this.projectRenderItemService.getProjectRenderItemJob(item.renderUid, {noToast: 'true'}).pipe(takeUntil(this.subject$)).subscribe({
            next: (job) => {
              if (job) {
                item.job = job;
              }
            },
            error: () => {
              item.job = {};
              item.job.error = true;
            }
          });
        }
      });
      return {projectRenderItems: items, headers: res?.headers};
    })).pipe(takeUntil(this.subject$)).subscribe({
      next: (res) => {
        this.renderItems = res?.projectRenderItems;
        this.projectRenderItemService.setProjectRenderItems(res);
      }
    }).add(() => this.isLoading = false);
  }

  onSort(event: any) {
    this.state!.sort = event;
    this.handleNavigation(this.state?.getQuery);
  }


  openFilterDialog(): void {
    this.dialogService.open(RenderDetailFilterDialogComponent).onClose.subscribe((req) => {
      if (req) {
        const ancientQuery: IState = this.state.getQuery;
        const currentQuery: IState = {
          page: ancientQuery.page,
          size: ancientQuery.size,
          sort: ancientQuery.sort,
          ...req
        };
        this.handleNavigation(currentQuery);
      }
    });
  }

  openConfirmExportSize(): void {
    this.dialogService.open(RenderExportCsvConfirmDialogComponent, {
      context: {
        listTableSize: this.state?.size ?? 0,
        listTotalSize: this.listTotalSize
      }
    }).onClose.pipe(takeUntil(this.subject$)).subscribe((res) => {
      const toExport = res?.['toExport'];
      const justTableFilter = res?.['justTableFilter'];
      if (toExport) {
        this.exportingCsv = true;
        const ids = {
          projectId: this.project?.id,
          renderId: this.project?.projectRenderId
        };
        if (!justTableFilter) {
          const query = this.state?.getQuery;
          query['page'] = query['page'] ? query['page'] - 1 : 0;
          query['size'] = this.listTotalSize;
          this.projectRenderItemService.queryByRenderId(ids, query, false).pipe(takeUntil(this.subject$)).subscribe((res) => {
            if (res?.projectRenderItems) {
              this.parseJSONToCSV(justTableFilter, res?.projectRenderItems);
            }
          }).add(() => this.exportingCsv = false);
        } else {
          this.parseJSONToCSV(justTableFilter);
        }
      }
    });
  }

  parseJSONToCSV(justTableFilter = true, renderItems?: IProjectRenderItem[]) {
    const options = {
      delimiter: ';',
      header: true
    };
    const allDataSources: any[] = [];
    renderItems = renderItems ?? this.renderItems;
    renderItems?.forEach(item => {
      if (item?.dataSource) {
        const dataSource: any = JSON.parse(item.dataSource);
        dataSource.videoUrl = item?.videoUrl;
        dataSource.renderStatus = item?.renderStatus;
        allDataSources.push(dataSource);
      }
    });
    const csv = this.papa.unparse(allDataSources, options);
    const exportSuccess = this.createUrl(csv);
    if (exportSuccess && this.project?.projectRenderId && this.state) {
      const query = this.state.getQuery;
      query['size'] = justTableFilter ? query['size'] : this.listTotalSize;
      query['page'] = query['page'] ? query['page'] - 1 : 0;
      this.projectRenderItemService.exportCsv(this.project.projectRenderId, query).pipe(takeUntil(this.subject$)).subscribe((data) => {
        this.toastService.show('', 'Exportado com sucesso', {status: 'success'});
      }).add(() => this.exportingCsv = false);
    } else {
      this.exportingCsv = false;
    }
  }

  createUrl(csv: any): boolean {
    if (this.isBrowser) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      // @ts-ignore
      a['style'] = 'display: none';
      const blob = new Blob([csv], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      if (url) {
        a.href = url;
        a.download = `${moment().format(DATE_FORMAT)}-${this.project?.slug}`;
        a.click();
        window.URL.revokeObjectURL(url);
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    this.renderDetailService.renderDetailData$.next(null);
    this.subject$.next(null);
    this.subject$.complete();
  }
}
