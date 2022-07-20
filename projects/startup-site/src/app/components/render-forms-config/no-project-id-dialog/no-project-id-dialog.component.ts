import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-no-project-id-dialog',
  templateUrl: './no-project-id-dialog.component.html',
  styleUrls: ['./no-project-id-dialog.component.scss']
})
export class NoProjectIdDialogComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  close(proceed: boolean = false): void {
    // this.dialogRef.close(proceed);
  }

}
