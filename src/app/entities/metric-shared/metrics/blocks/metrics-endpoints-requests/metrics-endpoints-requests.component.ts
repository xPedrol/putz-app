import { Component, Input } from '@angular/core';
import {Services} from '../../../../../models/config/metrics.model';


@Component({
  selector: 'putz-metrics-endpoints-requests',
  templateUrl: './metrics-endpoints-requests.component.html',
  styleUrls:[
    '../../../../../shared/themes/bootstrap-table.scss'
  ]
})
export class MetricsEndpointsRequestsComponent {
  /**
   * object containing service related metrics
   */
  @Input() endpointsRequestsMetrics?: Services;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;
}
