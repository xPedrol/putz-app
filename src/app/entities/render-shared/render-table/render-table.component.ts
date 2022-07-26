import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {IProjectRenderItem} from '../../../models/project-render-item.model';
import {ProjectRenderItemService} from '../../../services/project-render-item.service';
import {JobService} from '../../../services/job.service';
import {takeUntil} from 'rxjs/operators';
import {ProjectRenderService} from '../../../services/project-render.service';
import {ProjectService} from '../../../services/project.service';
import {IProject} from '../../../models/project.model';
import {ITableColumn} from '../../../models/table.model';
import {IProjectRenderItemStatus} from '../../../models/enums/project-render-item-status.model';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../constants/dialog-action.constants';
import {isPlatformBrowser} from '@angular/common';
import {SortEvent} from "../../../directives/sortable.directive";
import {ISort, Sort} from "../../../models/table/sort.model";
import {IProjectRender} from "../../../models/project-render.model";
import {DATE_FORMAT} from "../../../config/input.constants";

@Component({
  selector: 'app-render-table',
  templateUrl: './render-table.component.html',
  styleUrls: [
    './render-table.component.scss',
    '../../../shared/themes/common.scss',
  ],
})
export class RenderTableComponent implements OnInit, OnDestroy {
  isBrowser;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  subject$ = new Subject();
  renderItems: IProjectRenderItem[] | undefined;
  renderItemStatus = IProjectRenderItemStatus;
  project: IProject | undefined;
  projectRender: IProjectRender;
  rankColumns: ITableColumn[] = [
    {
      title: 'Nome',
      class: 'text-start',
      name: 'name',
      sort: true
    },
    {
      title: 'Início',
      class: 'text-start',
      name: 'startRenderDate',
      sort: false
    },
    {
      title: 'Situação',
      class: 'text-start',
      name: 'renderStatus',
      sort: true
    },
    {
      title: 'Término',
      class: 'text-start',
      name: 'endRenderDate',
      sort: true
    },
    {
      title: 'Exportado',
      class: 'text-start',
      name: 'exportedDate',
      sort: true
    },
    {
      title: 'Vídeo',
      class: 'text-start',
      name: 'videoUrl',
      sort: false
    },
    {
      title: '',
      class: 'text-start',
      name: 'actions',
      sort: false
    },
  ];
  sort: ISort | undefined;

  constructor(
    public renderItemService: ProjectRenderItemService,
    private jobService: JobService,
    private toastService: NbToastrService,
    private projectRenderService: ProjectRenderService,
    private projectService: ProjectService,
    private dialogService: NbDialogService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  ngOnInit(): void {
    this.getParams();
  }

  delete(item: IProjectRenderItem): void {
    const itemId = item?.id;
    if (itemId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Item: ${item?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.renderItemService.delete(itemId).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Item deletado com sucesso', {status: 'success'});
            const array = new Set(this.renderItems);
            array.delete(item);
            this.renderItemService.setProjectRenderItems({projectRenderItems: Array.from(array)});
            const size = this.renderItemService.totalCount$.getValue() - 1;
            this.renderItemService.totalCount$.next(size);
            this.stateChange.emit();
          });
        }
      });
    }
  }

  sendToRender(item: IProjectRenderItem): void {
    try {
      this.renderItemService.reRenderItem(item.renderProject.id, item.id, item).subscribe(() => {
        this.toastService.show('', 'Reenviado para renderização com sucesso', {status: 'success'});
        this.stateChange.emit();
      });
    } catch (e) {
      this.toastService.show(null, 'Erro ao reenviar formulário para renderização', {status: 'danger'});
    }

  }

  sendToSamba(item: IProjectRenderItem): void {
    try {
      this.renderItemService.reRenderItemInSamba(item.id).subscribe(() => {
        this.toastService.show('', 'Reenviado para Samba Vídeos com sucesso', {status: 'success'});
        this.stateChange.emit();
      });
    } catch (e) {
      this.toastService.show(null, 'Erro ao reenviar registro para Samba Vídeos', {status: 'danger'});
    }

  }

  getParams(): void {
    this.renderItemService.projectRenderItems$.subscribe(req => {
      if (req && req!.projectRenderItems) {
        this.renderItems = req!.projectRenderItems || [];
      }
    });
    this.projectService.project$.subscribe(project => {
      this.project = project ?? undefined;
    });
    this.projectRenderService.projectRender$.subscribe(projectRender => {
      this.projectRender = projectRender ?? undefined;
    });
  }

  createUrl(item: IProjectRenderItem): boolean {
    const videoUrl = item?.videoUrl;
    if (this.isBrowser && videoUrl) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      // @ts-ignore
      a['style'] = 'display: none';
      const blob = new Blob([videoUrl], {type: 'video\/mp4'});
      const url = window.URL.createObjectURL(blob);
      if (url) {
        a.href = url;
        a.download = `${item?.name}`;
        a.click();
        window.URL.revokeObjectURL(url);
        return true;
      }
    }
    return false;
  }

  callWhatsapp(whatsappNumber: string): void {
    if (this.isBrowser) {
      window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Olá.`, '_blank');
    }
  }

  identify(index: number) {
    return index;
  }

  trackProjectRenderItemsByFn(index: number, item: IProjectRenderItem) {
    return item.id;
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }
}
