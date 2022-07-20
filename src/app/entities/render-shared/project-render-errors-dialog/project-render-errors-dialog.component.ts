import {Component, OnInit} from '@angular/core';
import {IProjectRenderError} from "../../../models/project-render-error.model";
import {ProjectRenderService} from "../../../services/project-render.service";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-project-render-errors-dialog',
  templateUrl: './project-render-errors-dialog.component.html',
  styleUrls: ['./project-render-errors-dialog.component.scss']
})
export class ProjectRenderErrorsDialogComponent implements OnInit {
  projectRenderErrors: IProjectRenderError[];
  loadingProjectRenderErrors = false;
  constructor(
    private projectRenderService: ProjectRenderService,
    private dialogRef:NbDialogRef<ProjectRenderErrorsDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.getProjectRenderErrors();
  }

  getProjectRenderErrors(): void {
    this.loadingProjectRenderErrors = true;
    this.projectRenderService.getProjectRenderErrors().subscribe((projectRenderErrors: IProjectRenderError[]) => {
        this.projectRenderErrors = projectRenderErrors;
      }
    ).add(() => this.loadingProjectRenderErrors = false);
  }
  close(): void {
    this.dialogRef.close();
  }
}
