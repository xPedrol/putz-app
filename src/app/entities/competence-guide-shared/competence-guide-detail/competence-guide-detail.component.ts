import {Component, OnInit} from '@angular/core';
import {CompetenceGuideService} from '../../../services/competence-guide.service';
import {ICompetenceGuide} from '../../../models/competence-guide.model';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-competence-guide-update',
  templateUrl: './competence-guide-detail.component.html',
  styleUrls: ['./competence-guide-detail.component.scss']
})
export class CompetenceGuideDetailComponent implements OnInit {
  competenceGuide: ICompetenceGuide | undefined;
  competenceGuideId: number | undefined;

  constructor(
    private competenceGuideService: CompetenceGuideService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.competenceGuideId = this.activatedRoute.snapshot.params!.competenceGuideId;
    this.getCompetenceGuide();
  }

  getCompetenceGuide(): void {
    if (this.competenceGuideId) {
      this.handleCompetenceGuide(this.competenceGuideService.find(this.competenceGuideId));
    }
  }

  handleCompetenceGuide(observable: Observable<ICompetenceGuide>): void {
    observable.subscribe(cGuided => {
      this.competenceGuide = cGuided;
    });
  }
}
