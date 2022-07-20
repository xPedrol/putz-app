import {Component, OnInit} from '@angular/core';

import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProjectListMethodsComponent} from '../project-list-methods/project-list-methods.component';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-accordion',
  templateUrl: './project-accordion.component.html',
  styleUrls: [
    './project-accordion.component.scss',
    '../../../../shared/themes/common.scss'
  ]
})
export class ProjectAccordionComponent extends ProjectListMethodsComponent implements OnInit {
  projects: IProject[] | undefined;

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
    this.projectService.projects$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req) {
        this.projects = req.projects;
      }
    });
  }
}
