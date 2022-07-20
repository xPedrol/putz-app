import {Component, Input, OnInit} from '@angular/core';
import {ICompetence} from '../../../models/competence.model';

@Component({
  selector: 'app-competence-card',
  templateUrl: './competence-card.component.html',
  styleUrls: [
    './competence-card.component.scss',
    '../../../shared/themes/cursors.scss'
  ]
})
export class CompetenceCardComponent implements OnInit {
  @Input() competence: ICompetence | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
