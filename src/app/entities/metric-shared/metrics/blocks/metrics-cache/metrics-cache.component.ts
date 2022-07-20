import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {CacheMetrics} from '../../../../../models/config/metrics.model';
import {filterNaN} from '../../../../../core/utils/operators';


@Component({
  selector: 'putz-metrics-cache',
  templateUrl: './metrics-cache.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:[
    '../../../../../shared/themes/bootstrap-table.scss'
  ]
})
export class MetricsCacheComponent {
  /**
   * object containing all cache related metrics
   */
  @Input() cacheMetrics?: { [key: string]: CacheMetrics };

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;

  filterNaN = (input: number): number => filterNaN(input);
}
