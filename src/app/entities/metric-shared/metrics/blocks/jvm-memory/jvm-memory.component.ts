import { Component, Input } from '@angular/core';
import {JvmMetrics} from '../../../../../models/config/metrics.model';


@Component({
  selector: 'putz-jvm-memory',
  templateUrl: './jvm-memory.component.html',
})
export class JvmMemoryComponent {
  /**
   * object containing all jvm memory metrics
   */
  @Input() jvmMemoryMetrics?: { [key: string]: JvmMetrics };

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;
}
