import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {takeUntil} from "rxjs/operators";
import {IProject} from "../../../models/project.model";
import {ProjectService} from "../../../services/project.service";
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-project-schedule-date-sync-dialog',
  templateUrl: './project-schedule-date-sync-dialog.component.html',
  styleUrls: ['./project-schedule-date-sync-dialog.component.scss']
})
export class ProjectScheduleDateSyncDialogComponent implements OnInit, OnDestroy {
  project: IProject;
  subject$: Subject<any>;
  selectedSchedule: string;
  dateFormControl: FormControl;

  constructor(
    private dialogRef: NbDialogRef<ProjectScheduleDateSyncDialogComponent>,
    private projectService: ProjectService,
    private toastService: NbToastrService
  ) {
    this.subject$ = new Subject<any>();
    this.dateFormControl = new FormControl();
  }

  ngOnInit(): void {
    this.setInitialData();
  }

  close(recall: any = false): void {
    this.dialogRef.close(recall);
  }

  synchronizeSchedule(): void {
    if (this.project?.id && this.selectedSchedule) {
      this.projectService.synchronizeScheduleByName(this.project.id, this.selectedSchedule, this.dateFormControl.value).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Sincronizado com sucesso', {status: 'success'});
        this.close(true);
      });
    }
  }

  setInitialData(): void {
    if (this.project && this.project?.startDate) {
      this.dateFormControl.setValue(this.project.startDate);
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
