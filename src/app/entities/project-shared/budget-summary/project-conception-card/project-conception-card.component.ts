import {Component, Input, OnInit} from '@angular/core';
import {IProjectNegotiationCalcs} from '../../../../models/project-negotiation-calcs.model';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from "../../../../models/project.model";

@Component({
  selector: 'app-project-conception-card',
  templateUrl: './project-conception-card.component.html',
  styleUrls: ['./project-conception-card.component.scss']
})
export class ProjectConceptionCardComponent implements OnInit {
  @Input() isDetailed = false;
  negotiation: IProjectNegotiationCalcs | undefined;
  project:IProject;
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
    this.projectService.project$.subscribe(project => {
     this.project = project;
    });
  }

}
