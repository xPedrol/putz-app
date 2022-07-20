import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {IProjectItem} from "../../../../models/project-item.model";
import {IProject} from "../../../../models/project.model";
import {
  OpportunityRequestDialogComponent
} from "../../../opportunity-shared/opportunity-request-dialog/opportunity-request-dialog.component";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {DialogAction} from "../../../../constants/dialog-action.constants";
import {takeUntil} from "rxjs/operators";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {ProjectService} from "../../../../services/project.service";
import {ProjectItemService} from "../../../../services/project-item.service";

@Component({
  selector: 'app-project-item-card',
  templateUrl: './project-item-card.component.html',
  styleUrls: ['./project-item-card.component.scss']
})
export class ProjectItemCardComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;
  @Input() projectItem: IProjectItem | undefined;
  @Input() deleteOnBD: boolean = true;
  @Input() isOpportunity = false;
  @Output() itemChanged: EventEmitter<IProjectItem>;
  project: IProject | undefined;

  constructor(
    private dialogService: NbDialogService,
    public projectService: ProjectService,
    public projectItemService: ProjectItemService,
    private toastService: NbToastrService,
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
  }

  openOpportunityRequestDialog(): void {
    if (this.projectItem) {
      this.dialogService.open(OpportunityRequestDialogComponent, {context: {projectItem: this.projectItem}});
    }
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
            this.itemChanged.emit(this.projectItem);
          });
        }
      });
    } else if (!this.deleteOnBD) {
      this.itemChanged.emit(this.projectItem);
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
