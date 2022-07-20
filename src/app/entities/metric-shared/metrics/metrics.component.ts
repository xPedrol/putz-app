import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Metrics, Thread} from '../../../models/config/metrics.model';
import {combineLatest} from 'rxjs';
import {MetricsService} from '../../../services/config/metrics.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  metrics?: Metrics;
  threads?: Thread[];
  updatingMetrics = true;

  constructor(private metricsService: MetricsService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.updatingMetrics = true;
    combineLatest([this.metricsService.getMetrics(), this.metricsService.threadDump()]).subscribe(([metrics, threadDump]) => {
      this.metrics = metrics;
      this.threads = threadDump.threads;
      this.updatingMetrics = false;
      this.changeDetector.markForCheck();
    });
  }

  metricsKeyExists(key: keyof Metrics): boolean {
    return Boolean(this.metrics?.[key]);
  }

  metricsKeyExistsAndObjectNotEmpty(key: keyof Metrics): boolean {
    return Boolean(this.metrics?.[key] && JSON.stringify(this.metrics[key]) !== '{}');
  }

}
