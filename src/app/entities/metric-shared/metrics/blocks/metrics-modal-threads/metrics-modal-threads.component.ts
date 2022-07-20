import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Thread, ThreadState} from '../../../../../models/config/metrics.model';
import {NbDialogRef} from '@nebular/theme';


@Component({
  selector: 'putz-thread-modal',
  templateUrl: './metrics-modal-threads.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls:[
    '../../../../../shared/themes/bootstrap-table.scss'
  ]
})
export class MetricsModalThreadsComponent implements OnInit {
  ThreadState = ThreadState;
  threadStateFilter?: ThreadState;
  threads?: Thread[];
  threadDumpAll = 0;
  threadDumpBlocked = 0;
  threadDumpRunnable = 0;
  threadDumpTimedWaiting = 0;
  threadDumpWaiting = 0;

  constructor(private dialogRef:NbDialogRef<MetricsModalThreadsComponent>) {}

  ngOnInit(): void {
    this.threads?.forEach(thread => {
      if (thread.threadState === ThreadState.Runnable) {
        this.threadDumpRunnable += 1;
      } else if (thread.threadState === ThreadState.Waiting) {
        this.threadDumpWaiting += 1;
      } else if (thread.threadState === ThreadState.TimedWaiting) {
        this.threadDumpTimedWaiting += 1;
      } else if (thread.threadState === ThreadState.Blocked) {
        this.threadDumpBlocked += 1;
      }
    });

    this.threadDumpAll = this.threadDumpRunnable + this.threadDumpWaiting + this.threadDumpTimedWaiting + this.threadDumpBlocked;
  }

  getBadgeClass(threadState: ThreadState): string {
    if (threadState === ThreadState.Runnable) {
      return 'badge-success';
    } else if (threadState === ThreadState.Waiting) {
      return 'badge-info';
    } else if (threadState === ThreadState.TimedWaiting) {
      return 'badge-warning';
    } else if (threadState === ThreadState.Blocked) {
      return 'badge-danger';
    }
    return '';
  }

  getThreads(): Thread[] {
    return this.threads?.filter(thread => !this.threadStateFilter || thread.threadState === this.threadStateFilter) ?? [];
  }

  dismiss(): void {
    this.dialogRef.close();
  }
}
