import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {IProjectStep} from "../../../../models/project-step.model";
import {IProject} from "../../../../models/project.model";
import {ProjectItemService} from "../../../../services/project-item.service";
import {IProjectItem} from "../../../../models/project-item.model";

@Component({
  selector: 'app-project-item-detail-dialog',
  templateUrl: './project-item-detail-dialog.component.html',
  styleUrls: ['./project-item-detail-dialog.component.scss', '../../../../shared/themes/common.scss',]
})
export class ProjectItemDetailDialogComponent implements OnInit {
  project: IProject;
  projectStep: IProjectStep;
  projectItems: IProjectItem[];
  loadingProjectItems = true;

  constructor(
    private dialogRef: NbDialogRef<ProjectItemDetailDialogComponent>,
    private projectItemService: ProjectItemService
  ) {
  }

  ngOnInit(): void {
    this.getProjectItems();
  }

  close(res: any = {}): void {
    // this.dialogRef.close(res);
    this.dialogRef.close();
  }

  getProjectItems() {
    this.loadingProjectItems = true;
    this.projectItemService.queryByProjectIdAndStepId(this.project.id, this.projectStep.id).pipe().subscribe(({projectItems}) => {
      this.projectItems = projectItems;
    }).add(() => {
      this.loadingProjectItems = false;
    });
  }

}
