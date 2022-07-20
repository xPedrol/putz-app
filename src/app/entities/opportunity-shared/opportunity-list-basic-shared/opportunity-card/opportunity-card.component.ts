import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IProjectItemRequest} from '../../../../models/project-item-request.model';
import {ProjectItemRequestStatus} from '../../../../models/enums/project-item-request-status.model';

@Component({
  selector: 'app-opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpportunityCardComponent implements OnInit {
  projectItemRequestStatus = ProjectItemRequestStatus;
  @Input() opportunity: IProjectItemRequest | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
