import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-no-project-id-dialog',
  templateUrl: './no-project-id-dialog.component.html',
  styleUrls: ['./no-project-id-dialog.component.scss']
})
export class NoProjectIdDialogComponent implements OnInit {

  constructor(
    private dialogRef: NbDialogRef<NoProjectIdDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }

  close(proceed: boolean = false): void {
    this.dialogRef.close(proceed);
  }

}
