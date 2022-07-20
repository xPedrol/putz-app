import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProjectRenderError} from "../../../../models/project-render-error.model";
import {ProjectRenderService} from "../../../../services/project-render.service";
import {takeUntil} from "rxjs/operators";
import {ProjectService} from "../../../../services/project.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-render-detail-errors-tab',
  templateUrl: './render-detail-errors-tab.component.html',
  styleUrls: ['./render-detail-errors-tab.component.scss']
})
export class RenderDetailErrorsTabComponent implements OnInit, OnDestroy {
  projectRenderErrors: IProjectRenderError[];
  loadingProjectRenderErrors = false;
  subject$: Subject<any>;

  constructor(
    private projectRenderService: ProjectRenderService,
    private projectService: ProjectService
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.getProjectRenderErrors(project.projectRenderSlug);
      }
    });
  }

  getProjectRenderErrors(projectRenderSlug?:string): void {
    this.loadingProjectRenderErrors = true;
    this.projectRenderService.getProjectRenderErrors(projectRenderSlug).subscribe((projectRenderErrors: IProjectRenderError[]) => {
        this.projectRenderErrors = projectRenderErrors;
      }
    ).add(() => this.loadingProjectRenderErrors = false);
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
