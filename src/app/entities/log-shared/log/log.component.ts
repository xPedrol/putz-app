import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LogsService} from '../../../services/logs.service';
import {Level, Log, LoggersResponse} from '../../../models/config/log.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss', '../../../shared/themes/nebular-overrides.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent implements OnInit {
  loggers?: Log[];
  loadingLogs = true;
  filteredAndOrderedLoggers?: Log[];
  filter = '';
  orderProp: keyof Log = 'name';
  ascending = true;
  singleSelectGroupValue = [];

  constructor(private logsService: LogsService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.findAndExtractLoggers();
  }

  changeLevel(name: string, level: Level): void {
    this.logsService.changeLevel(name, level).subscribe(() => {
      this.findAndExtractLoggers();
    });
  }

  filterAndSort(): void {
    this.filteredAndOrderedLoggers = this.loggers!.filter(
      logger => !this.filter || logger.name.toLowerCase().includes(this.filter.toLowerCase())
    ).sort((a, b) => {
      if (a[this.orderProp] < b[this.orderProp]) {
        return this.ascending ? -1 : 1;
      } else if (a[this.orderProp] > b[this.orderProp]) {
        return this.ascending ? 1 : -1;
      } else if (this.orderProp === 'level') {
        return a.name < b.name ? -1 : 1;
      }
      return 0;
    });
    // this.filteredAndOrderedLoggers.forEach()
  }

  private findAndExtractLoggers(): void {
    this.logsService.findAll().subscribe((response: LoggersResponse) => {
      this.loggers = Object.entries(response.loggers).map(([key, logger]) => new Log(key, logger.effectiveLevel));
      this.filterAndSort();
      this.cd.detectChanges();
    }).add(() => {
      this.loadingLogs = false;
    });
  }

  updateSingleSelectGroupValue(value: any, name: string | undefined): void {
    if (name) {
      this.changeLevel(name, value);
    }
    // this.singleSelectGroupValue = value;
    // this.cd.markForCheck();
  }

  identify(index: any): any {
    return index;
  }
}
