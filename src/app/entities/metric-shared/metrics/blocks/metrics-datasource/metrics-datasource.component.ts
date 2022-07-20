import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Databases} from '../../../../../models/config/metrics.model';
import {filterNaN} from '../../../../../core/utils/operators';



@Component({
  selector: 'putz-metrics-datasource',
  templateUrl: './metrics-datasource.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:[
    '../../../../../shared/themes/bootstrap-table.scss'
  ]
})
export class MetricsDatasourceComponent {
  /**
   * object containing all datasource related metrics
   */
  @Input() datasourceMetrics?: Databases;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;

  filterNaN = (input: number): number => filterNaN(input);
}
