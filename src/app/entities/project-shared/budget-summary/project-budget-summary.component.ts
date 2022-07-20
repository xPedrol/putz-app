import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {IProjectNegotiationCalcs} from '../../../models/project-negotiation-calcs.model';

@Component({
  selector: 'app-project-budget-summary',
  templateUrl: './project-budget-summary.component.html',
  styleUrls: ['./project-budget-summary.component.scss']
})
export class ProjectBudgetSummaryComponent implements OnInit {
  @Input() isDetailed = false;
  negotiation: IProjectNegotiationCalcs | undefined;

  constructor(
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.projectService.negotiationCalc$.subscribe(negotiation => {
      if (negotiation) {
        this.negotiation = negotiation;
      }
    });
  }

}
