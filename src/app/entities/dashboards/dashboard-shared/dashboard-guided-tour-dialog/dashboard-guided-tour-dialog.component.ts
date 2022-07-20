import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {MiddlewareCookieService} from '../../../../services/middleware-cookie.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-guided-tour-dialog',
  templateUrl: './dashboard-guided-tour-dialog.component.html',
  styleUrls: ['./dashboard-guided-tour-dialog.component.scss']
})
export class DashboardGuidedTourDialogComponent implements OnInit {

  constructor(
    private dialogRef: NbDialogRef<DashboardGuidedTourDialogComponent>,
    private cookieService: MiddlewareCookieService
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.cookieService.putCookie(environment.DASHBOARD_TOUR_KEY, true);
    this.dialogRef.close();
  }

}
