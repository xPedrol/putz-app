import {Component, Input} from '@angular/core';

import {MetricsModalThreadsComponent} from '../metrics-modal-threads/metrics-modal-threads.component';
import {Thread, ThreadState} from '../../../../../models/config/metrics.model';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'putz-jvm-threads',
  templateUrl: './jvm-threads.component.html',
})
export class JvmThreadsComponent {
  threadStats = {
    threadDumpAll: 0,
    threadDumpRunnable: 0,
    threadDumpTimedWaiting: 0,
    threadDumpWaiting: 0,
    threadDumpBlocked: 0,
  };

  @Input()
  set threads(threads: Thread[] | undefined) {
    this._threads = threads;

    threads?.forEach(thread => {
      if (thread.threadState === ThreadState.Runnable) {
        this.threadStats.threadDumpRunnable += 1;
      } else if (thread.threadState === ThreadState.Waiting) {
        this.threadStats.threadDumpWaiting += 1;
      } else if (thread.threadState === ThreadState.TimedWaiting) {
        this.threadStats.threadDumpTimedWaiting += 1;
      } else if (thread.threadState === ThreadState.Blocked) {
        this.threadStats.threadDumpBlocked += 1;
      }
    });

    this.threadStats.threadDumpAll =
      this.threadStats.threadDumpRunnable +
      this.threadStats.threadDumpWaiting +
      this.threadStats.threadDumpTimedWaiting +
      this.threadStats.threadDumpBlocked;
  }

  get threads(): Thread[] | undefined {
    return this._threads;
  }

  private _threads: Thread[] | undefined;

  constructor(private dialogService: NbDialogService) {
  }

  open(): void {
    this.dialogService.open(MetricsModalThreadsComponent, {
      context: {
        threads: this.threads
      }
    });
  }
}
