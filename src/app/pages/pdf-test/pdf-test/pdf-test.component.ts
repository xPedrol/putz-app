import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {combineLatest, Subject, takeUntil} from 'rxjs';
import {IProject} from 'src/app/models/project.model';
import {ProjectService} from 'src/app/services/project.service';
// import * as htmlToPdfmake from 'html-to-pdfmake';


@Component({
  selector: 'app-pdf-test',
  templateUrl: './pdf-test.component.html',
  styleUrls: ['./pdf-test.component.scss'],
  providers: [
    ProjectService
  ]
})
export class PdfTestComponent implements OnInit, OnDestroy {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  project: IProject | undefined;
  subject$: Subject<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
    ]).subscribe(([params]) => {
      if (params?.projectId) {
        this.getProject(params.projectId);
      }
    });
  }


  getProject(projectId: number): void {
    this.projectService.find(projectId).pipe(takeUntil(this.subject$)).subscribe(project => {
      this.project = project ?? undefined;
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
