import { Component, Input } from '@angular/core';
import {GarbageCollector} from '../../../../../models/config/metrics.model';


@Component({
  selector: 'putz-metrics-garbagecollector',
  templateUrl: './metrics-garbagecollector.component.html',
  styleUrls:[
    '../../../../../shared/themes/bootstrap-table.scss'
  ]
})
export class MetricsGarbageCollectorComponent {
  /**
   * object containing garbage collector related metrics
   */
  @Input() garbageCollectorMetrics?: GarbageCollector;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;
}
