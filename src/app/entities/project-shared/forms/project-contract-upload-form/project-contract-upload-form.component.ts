import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-contract-upload-form',
  templateUrl: './project-contract-upload-form.component.html',
  styleUrls: ['./project-contract-upload-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContractUploadFormComponent implements OnInit, OnChanges {
  contractControl: FormControl;
  @Input() canEdit: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.contractControl = new FormControl(null, [Validators.required]);
  }

  ngOnInit(): void {

  }

  validateAndGetRaw(): any {
    if (this.contractControl.invalid) {
      this.contractControl.markAllAsTouched();
      this.changeDetector.detectChanges();
    } else {
      this.contractControl.markAsUntouched();
      this.changeDetector.detectChanges();
      return this.contractControl.value;
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.canEdit.currentValue !== changes.canEdit.previousValue) {
      if (!this.canEdit) {
        this.contractControl.disable();
      } else {
        this.contractControl.enable();
      }
    }
  }

  onSelect(event: any) {
    this.contractControl.setValue(event.addedFiles[0]);
    this.changeDetector.detectChanges();
  }

  onRemove() {
    this.contractControl.reset();
    this.changeDetector.detectChanges();
  }
}
