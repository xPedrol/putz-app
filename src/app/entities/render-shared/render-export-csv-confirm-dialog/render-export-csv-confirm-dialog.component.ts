import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-render-export-csv-confirm-dialog',
  templateUrl: './render-export-csv-confirm-dialog.component.html',
  styleUrls: ['./render-export-csv-confirm-dialog.component.scss']
})
export class RenderExportCsvConfirmDialogComponent implements OnInit {
  justTableFilter = false;
  listTotalSize = 0;
  listTableSize = 0;

  constructor(
    private dialogRef: NbDialogRef<RenderExportCsvConfirmDialogComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.listTotalSize <= this.listTableSize) {
      this.justTableFilter = true;
    }
  }

  close(toExport = false): void {
    if (toExport) {
      this.dialogRef.close({justTableFilter: this.justTableFilter, toExport});
    } else {
      this.dialogRef.close();
    }
  }
}
