import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-portfolio-manager-info-dialog',
  templateUrl: './portfolio-info-dialog.component.html',
  styleUrls: ['./portfolio-info-dialog.component.scss']
})
export class PortfolioInfoDialogComponent implements OnInit {

  constructor(
    private dialogRef: NbDialogRef<PortfolioInfoDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  close(res: any = {}): void {
    // this.dialogRef.close(res);
    this.dialogRef.close({recall: true});
  }
}
