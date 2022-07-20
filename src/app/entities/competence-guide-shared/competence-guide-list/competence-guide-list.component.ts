import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ICompetenceGuide} from '../../../models/competence-guide.model';
import {CompetenceGuideService} from '../../../services/competence-guide.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-competence-guide-list',
  templateUrl: './competence-guide-list.component.html',
  styleUrls: ['./competence-guide-list.component.scss']
})
export class CompetenceGuideListComponent implements OnInit, OnDestroy {
  competenceGuides: ICompetenceGuide[] | undefined;
  @Input() defaultSize: number = 15;
  subject$: Subject<any>;

  constructor(
    public competenceGuideService: CompetenceGuideService,
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.competenceGuideService.competenceGuides$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req) {
        this.competenceGuides = req.competenceGuides;
      }
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  trackCompetenceGuidesByFn(index: number, item: ICompetenceGuide): number {
    return item.id as number;
  }
}
