import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProject } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-putz-sml-brazil-contract',
  templateUrl: './putz-sml-brazil-contract.component.html',
  styleUrls: ['./putz-sml-brazil-contract.component.scss']
})
export class PutzSmlBrazilContractComponent implements OnInit, OnDestroy {
  project: IProject | undefined;
  subject$: Subject<any>;
  constructor(
    private projectService: ProjectService
  ) {
    this.subject$ = new Subject();
  }
  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }


  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      this.project = project ?? undefined;
    });
  }

}
