import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap, of, Subject, takeWhile, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IProjectRenderItemStatus} from '../../../../../../../src/app/models/enums/project-render-item-status.model';
import {ActivatedRoute} from '@angular/router';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {IProjectRenderItem} from '../../../../../../../src/app/models/project-render-item.model';

@Component({
  selector: 'app-render-form-feedback-detail',
  templateUrl: './render-form-feedback-detail.component.html',
  styleUrls: ['./render-form-feedback-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderFormFeedbackDetailComponent implements OnInit, OnDestroy {
  renderId: number | undefined;
  renderItemId: number | undefined;
  renderItem: IProjectRenderItem | undefined;
  isPreRegistered: boolean | undefined;
  subject$: Subject<any>;
  loadingRenderItem = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public renderItemService: ProjectRenderItemService,
    public cd: ChangeDetectorRef
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      const {renderId, renderItemId} = param;
      this.renderId = renderId;
      this.renderItemId = renderItemId;
      if (renderId && renderItemId) {
        timer(0, 8000)
          .pipe(takeWhile(() => !this.renderItem?.videoUrl && !!(this.renderId && this.renderItemId))).subscribe(() => {
          this.getRenderItem();
        });
      } else {
        this.renderItem = null;
        this.cd.markForCheck();
      }
    });
  }

  getRenderItem(): void {
    if (this.renderId && this.renderItemId) {
      this.loadingRenderItem = true;
      this.renderItemService.findRenderPublicItem({
        renderId: this.renderId,
        itemId: this.renderItemId,
      }, null, false).pipe(takeUntil(this.subject$), mergeMap(renderItem => {
        if (renderItem) {
          this.renderItem = this.renderItem ? {...this.renderItem, ...renderItem} : renderItem;
          this.isPreRegistered = !!(Number(this.renderItem?.renderUid) && !this.renderItem?.videoUrl);
          if (renderItem.renderUid && renderItem.renderStatus !== IProjectRenderItemStatus.PRECREATED) {
            return this.renderItemService.getProjectRenderItemJob(renderItem.renderUid);
          }
        }
        return of(null);
      })).subscribe({
        next: (job: any) => {
          if (job && this.renderItem) {
            this.renderItem.job = this.renderItem.job ? {...this.renderItem.job, ...job} : job;
          }
        },
        error: () => {
          if (this.renderItem) {
            this.renderItem.job = null;
          }
        }
      }).add(() => {
        this.loadingRenderItem = false;
        this.cd.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
