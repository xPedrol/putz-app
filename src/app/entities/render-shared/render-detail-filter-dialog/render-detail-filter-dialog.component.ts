import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormControl, FormGroup} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {INbRangePicker} from "../../../models/nb-range-picker.model";
import {
  projectRenderItemStatus,
  projectRenderItemStatusNotInProgress
} from "../../../models/enums/project-render-item-status.model";
import {State} from "../../../models/table/state.model";
import {Subject} from "rxjs";
import {TableBase} from "../../../models/table/table-base.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment";
import {deleteField} from "../../../core/utils/deleteField";

@Component({
  selector: 'app-render-detail-filter-dialog',
  templateUrl: './render-detail-filter-dialog.component.html',
  styleUrls: ['./render-detail-filter-dialog.component.scss']
})
export class RenderDetailFilterDialogComponent extends TableBase implements OnInit {
  filterForm: FormGroup;
  subject$: Subject<any>;
  projectRenderItemStatus = projectRenderItemStatus;

  constructor(
    private dialogRef: NbDialogRef<RenderDetailFilterDialogComponent>,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject();
    this.filterForm = new FormGroup({
      dataRangeSearch: new FormControl(),
      statusSearch: new FormControl(),
      name: new FormControl()
    });
    this.state = new State(null, true);
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(takeUntil(this.subject$)).subscribe((
      {dataRangeSearch, statusSearch, name}: any) => {

      let canQuery = false;
      if (name) {
        this.state.searchTerm['name.contains'] = name;
      } else {
        deleteField(this.state.searchTerm, this.state.searchTerm['name.contains']);
      }
      if (dataRangeSearch?.start && dataRangeSearch?.end) {
        const {start, end}: INbRangePicker = dataRangeSearch;
        end.add('23', 'hours').add('59', 'minutes').add('59', 'seconds');
        this.state.searchTerm = {
          ...this.state.searchTerm,
          ...{
            'createdDate.greaterThanOrEqual': start?.toJSON() ?? '',
            'createdDate.lessThanOrEqual': end?.toJSON() ?? ''
          }
        };
        canQuery = true;
      } else {
        this.state.searchTerm = deleteField(this.state.searchTerm, 'createdDate.greaterThanOrEqual');
        this.state.searchTerm = deleteField(this.state.searchTerm, 'createdDate.lessThanOrEqual');
      }
      if (statusSearch) {
        if (statusSearch !== 'inProgress') {
          this.state.searchTerm = {
            ...this.state.searchTerm,
            ...{
              'renderItemJobStatus.equals': statusSearch
            }
          };
          this.state.searchTerm = deleteField(this.state.searchTerm, 'renderItemJobStatus.notIn');
        } else {
          this.state.searchTerm = {
            ...this.state.searchTerm,
            ...{
              'renderItemJobStatus.notIn': projectRenderItemStatusNotInProgress
            }
          };
          this.state.searchTerm = deleteField(this.state.searchTerm, 'renderItemJobStatus.equals');
        }
        canQuery = true;
      } else {
        this.state.searchTerm = deleteField(this.state.searchTerm, 'renderItemJobStatus.notIn');
        this.state.searchTerm = deleteField(this.state.searchTerm, 'renderItemJobStatus.equals');
      }
      if (canQuery) {
        this.state = new State(this.state, true);
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && Object.keys(params).length > 0) {
        const greater = params['createdDate.greaterThanOrEqual'];
        const less = params['createdDate.lessThanOrEqual'];
        const status = params['renderItemJobStatus.equals'];
        if (greater && less) {
          this.filterForm.get('dataRangeSearch').setValue({
            start: moment(greater),
            end: moment(less)
          });
        }
        if (status) {
          this.filterForm.get('statusSearch').setValue(status);
        }
      }
    });
  }

  search(): void {
    this.close(this.state.getQueryWithoutUndefined());
  }

  close(res?: any) {
    this.dialogRef.close(res);
  }

  resetFilterForm(): void {
    this.state = new State(null, true);
    this.close(this.state.getQueryWithoutUndefined());
  }
}
