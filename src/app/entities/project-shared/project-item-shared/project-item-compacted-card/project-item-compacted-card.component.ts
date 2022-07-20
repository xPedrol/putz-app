import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IProjectItem} from '../../../../models/project-item.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProjectItemService} from '../../../../services/project-item.service';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {ProjectItemDialogComponent} from '../project-item-dialog/project-item-dialog.component';

@Component({
  selector: 'app-project-item-compacted-card',
  templateUrl: './project-item-compacted-card.component.html',
  styleUrls: ['./project-item-compacted-card.component.css', '../../../../shared/themes/common.scss']
})
export class ProjectItemCompactedCardComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;
  @Input() projectItem: IProjectItem | undefined;
  @Input() canEdit: boolean = true;
  @Input() deleteOnBD: boolean = true;
  @Input() isOpportunity = false;
  @Output() itemChanged: EventEmitter<{ projectItem: IProjectItem, action: 'UPDATE' | 'DELETE' }>;
  project: IProject | undefined;

  constructor(
    private dialogService: NbDialogService,
    public projectService: ProjectService,
    public projectItemService: ProjectItemService,
    private toastService: NbToastrService,
  ) {
    this.subject$ = new Subject<any>();
    this.itemChanged = new EventEmitter<{ projectItem: IProjectItem, action: 'UPDATE' | 'DELETE' }>();
  }

  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        // this.projectItem.project = project;
      }
    });
  }


  deleteProject(): void {
    if (this.projectItem?.id && this.projectItem?.project?.id && this.deleteOnBD) {
      const ids = {
        projectId: this.project?.id ?? this.projectItem?.project?.id,
        itemId: this.projectItem?.id
      };
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Item: ${this.projectItem?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectItemService.delete(ids).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
            this.itemChanged.emit({projectItem: this.projectItem, action: 'DELETE'});
          });
        }
      });
    } else if (!this.deleteOnBD) {
      this.itemChanged.emit({projectItem: this.projectItem, action: 'DELETE'});
    }
  }

  openEditProjectItemDialog(): void {
    this.dialogService.open(ProjectItemDialogComponent, {
      context: {
        saveItemOnBD: false,
        projectItem: this.projectItem
      }
    }).onClose.pipe(takeUntil(this.subject$)).subscribe((projectItem: IProjectItem) => {
      if (projectItem) {
        this.itemChanged.emit({projectItem: projectItem, action: 'UPDATE'});
      }
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
