import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {formatBytes} from '../../../core/utils/formatBytes';

interface IDisplayValues {
  maxFileSize: string | undefined;
  fileSize: string | undefined;
}

@Component({
  selector: 'app-file-size-warning',
  templateUrl: './file-size-warning.component.html',
  styleUrls: ['./file-size-warning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSizeWarningComponent implements OnInit {
  @Input() maxFileSize: number = 40;
  @Input() file: File | undefined;
  displayValues: IDisplayValues | undefined;

  constructor(
    private dialogRef: NbDialogRef<FileSizeWarningComponent>
  ) {
  }

  ngOnInit(): void {
    if (!this.file || !this.maxFileSize) {
      throw 'Input error';
    }
    this.displayValues = {
      fileSize: formatBytes(this.file?.size),
      maxFileSize: formatBytes(this.maxFileSize)
    };
  }

  close(proceed = false): void {
    this.dialogRef.close(proceed);
  }

}
