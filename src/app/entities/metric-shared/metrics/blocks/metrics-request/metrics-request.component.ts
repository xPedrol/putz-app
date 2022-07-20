import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {HttpServerRequests} from '../../../../../models/config/metrics.model';
import {filterNaN} from '../../../../../core/utils/operators';


@Component({
  selector: 'putz-metrics-request',
  templateUrl: './metrics-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:[
    '../../../../../shared/themes/bootstrap-table.scss'
  ]
})
export class MetricsRequestComponent {
  /**
   * object containing http request related metrics
   */
  @Input() requestMetrics?: HttpServerRequests;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;

  filterNaN = (input: number): number => filterNaN(input);
}
