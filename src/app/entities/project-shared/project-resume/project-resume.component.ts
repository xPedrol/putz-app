import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProjectListMethodsComponent} from '../lists/project-list-methods/project-list-methods.component';

@Component({
  selector: 'app-project-resume',
  templateUrl: './project-resume.component.html',
  styleUrls: ['./project-resume.component.scss']
})
export class ProjectResumeComponent extends ProjectListMethodsComponent implements OnInit {
  @Input() project: IProject | undefined;

  constructor(
    public projectService: ProjectService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService
  ) {
    super(
      projectService,
      toastService,
      dialogService
    );
  }

  ngOnInit(): void {
  }

}
