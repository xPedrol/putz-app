import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, mergeMap, of, Subject, Subscription, takeWhile, timer} from 'rxjs';
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
  loadingRenderItem = false;
  timerSubscription: Subscription;
  timeForNextRefresh = 0;
  renderStatus = IProjectRenderItemStatus;
  timer$ = interval(6000).pipe(takeWhile(() => {
    return !this.renderItem?.videoUrl &&
      !!(this.renderId &&
        this.renderItemId);
  }));

  constructor(
    public activatedRoute: ActivatedRoute,
    public renderItemService: ProjectRenderItemService,
    public cd: ChangeDetectorRef
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    this.getParams();
    timer(0, 1000).subscribe(() => {
      if (this.timeForNextRefresh > 0) {
        this.timeForNextRefresh--;
        console.warn(this.timeForNextRefresh);
        this.cd.markForCheck();
      }
    });
  }

  initTimer(): void {
    this.timerSubscription = this.timer$.subscribe(() => {
      console.warn('Timer reiniciado');
      this.getRenderItem();
    });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getParams(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      const {renderId, renderItemId} = param;
      this.renderId = renderId;
      this.renderItemId = renderItemId;
      if (renderId && renderItemId) {
        this.getRenderItem();
      } else {
        this.renderItem = null;
      }
      this.cd.markForCheck();
    });
  }

  getRenderItem(): void {
    if (this.renderId && this.renderItemId) {
      this.loadingRenderItem = true;
      this.stopTimer();
      this.timer$.subscribe().unsubscribe();
      if (!this.renderItem) {
        this.cd.markForCheck();
      }
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
        this.initTimer();
        this.timeForNextRefresh = 6;
        console.warn('Requisição finalizada');
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
