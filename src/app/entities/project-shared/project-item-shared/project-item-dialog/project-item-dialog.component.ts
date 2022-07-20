import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IProjectItem} from '../../../../models/project-item.model';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {ProjectItemService} from '../../../../services/project-item.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProjectItemFormComponent} from "../project-item-form/project-item-form.component";

@Component({
  selector: 'app-project-item-dialog',
  templateUrl: './project-item-dialog.component.html',
  styleUrls: ['./project-item-dialog.component.scss', '../../../../shared/themes/common.scss']
})
export class ProjectItemDialogComponent implements OnInit, OnDestroy {
  @ViewChild('projectItemFormComponent', {static: true}) projectItemForm: ProjectItemFormComponent;
  projectItem: IProjectItem | undefined;
  saveItemOnBD: boolean = true;
  project: IProject | undefined;
  subject$: Subject<any>;

  constructor(
    private dialogRef: NbDialogRef<ProjectItemDialogComponent>,
    private projectService: ProjectService,
    private projectItemService: ProjectItemService,
    private toastService: NbToastrService
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  close(res: any = null): void {
    this.dialogRef.close(res);
  }

  getParams(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
      }
    });
  }

  save(): void {
    const projectItem = this.projectItemForm.validateAndGetRaw();
    if (projectItem) {
      if (this.project?.id && this.saveItemOnBD) {
        const request = projectItem?.id ? this.projectItemService.update(projectItem, this.project.id) : this.projectItemService.create(projectItem, this.project.id);
        request.pipe(takeUntil(this.subject$)).subscribe((projectItem) => {
          this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
          this.close(projectItem);
        });
      } else if (!this.saveItemOnBD) {
        this.close(projectItem);
      }
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
