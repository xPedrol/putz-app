import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EMPTY, Subject, timer} from 'rxjs';
import {IProjectRenderItem} from '../../../../../../../src/app/models/project-render-item.model';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {IProjectRenderItemStatus} from '../../../../../../../src/app/models/enums/project-render-item-status.model';
import {HandleFormComponent} from '../handle-form/handle-form.component';
import {environment} from '../../../../../../../src/environments/environment';

interface IRenderIds {
  renderId?: number;
  renderItemId?: number;
}

@Component({
  selector: 'app-render-browser-detail',
  templateUrl: './render-client-detail.component.html',
  styleUrls: ['./render-client-detail.component.scss']
})
export class RenderClientDetailComponent implements OnInit, OnDestroy {
  @ViewChild('handleFormComponent', {static: false}) handleForm: HandleFormComponent | undefined;
  subject$: Subject<any>;
  renderItem: IProjectRenderItem | undefined | null;
  renderIds: IRenderIds = {
    renderId: undefined,
    renderItemId: undefined
  };
  isPreRegistered = false;
  isDevelopMode = !environment.production;

  constructor(
    private renderItemService: ProjectRenderItemService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    private router: Router
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      const {renderId, renderItemId} = param;
      if (renderId && renderItemId) {
        this.renderIds = param;
        timer(0, 3000).subscribe(() => {
          this.getRenderItem();
        });
      }
    });
  }

  getRenderItem(): void {
    const {renderId, renderItemId: itemId} = this.renderIds;
    if (renderId && itemId) {
      this.renderItemService.findRenderPublicItem({renderId, itemId}).pipe(catchError(() => {
        this.renderItem = null;
        return EMPTY;
      }), switchMap(renderItem => {
        if (renderItem) {
          this.renderItem = {...this.renderItem, ...renderItem};
          this.isPreRegistered = !!(Number(this.renderItem?.renderUid) && !this.renderItem?.videoUrl);
          if (renderItem.renderUid && renderItem.renderStatus !== IProjectRenderItemStatus.PRECREATED) {
            return this.renderItemService.getProjectRenderItemJob(renderItem.renderUid);
          }
        }
        return EMPTY;
      })).pipe(takeUntil(this.subject$)).subscribe(job => {
        if (job && this.renderItem) {
          this.renderItem.job = job;
        }
      }, () => {
        this.renderItem!.job = null;
      });
    }
  }

  onSubmit() {
    if (this.handleForm && this.handleForm.currentForm) {
      this.handleForm.currentForm?.onSubmitPrecadastro().pipe(takeUntil(this.subject$)).subscribe((renderItem) => {
        if (renderItem) {
          const params: IRenderIds = {
            renderId: renderItem?.renderProject?.id,
            renderItemId: renderItem?.id,
          };
          this.router.navigate([], {
            queryParams: params,
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'merge'
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
