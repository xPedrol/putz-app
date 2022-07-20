import {Component, OnInit} from '@angular/core';
import {IProject} from "../../../models/project.model";
import {FormControl} from "@angular/forms";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-project-conception-cancel-dialog',
  templateUrl: './project-conception-cancel-dialog.component.html',
  styleUrls: ['./project-conception-cancel-dialog.component.scss']
})
export class ProjectConceptionCancelDialogComponent implements OnInit {
  project: IProject;
  messageControl: FormControl;

  constructor(
    private dialogRef: NbDialogRef<ProjectConceptionCancelDialogComponent>
  ) {
    this.messageControl = new FormControl(null);
  }

  ngOnInit(): void {
  }

  close(message = undefined): void {
    this.dialogRef.close(message);
  }

  closeWithMsg(): void {
    if (this.messageControl.value) {
      this.close(this.messageControl.value.trim());
    } else {
      this.close(null);
    }
  }
}
