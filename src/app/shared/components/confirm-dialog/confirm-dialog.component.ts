import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {DialogAction} from '../../../constants/dialog-action.constants';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  msg: string;
  action: DialogAction | undefined;
  actions = DialogAction;
  constructor(
    private dialogRef: NbDialogRef<ConfirmDialogComponent>
  ) {
    this.msg = 'Deseja prosseguir com a ação?';
  }

  ngOnInit(): void {
  }

  close(proceed = false): void {
    this.dialogRef.close(proceed);
  }
}
