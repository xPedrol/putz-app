import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-status-card',
  templateUrl: './dashboard-status-card.component.html',
  styleUrls: ['./dashboard-status-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardStatusCardComponent implements OnInit {
  @Input() message: string = 'test';
  @Input() type: string = 'primary';
  @Input() value: number | string = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
