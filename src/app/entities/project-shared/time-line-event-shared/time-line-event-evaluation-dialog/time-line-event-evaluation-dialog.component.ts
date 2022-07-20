import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';

@Component({
  selector: 'app-time-line-event-evaluation-dialog',
  templateUrl: './time-line-event-evaluation-dialog.component.html',
  styleUrls: [
    './time-line-event-evaluation-dialog.component.scss',
    '../../../../shared/themes/star-rating.scss'
  ]
})
export class TimeLineEventEvaluationDialogComponent implements OnInit {
  editForm: FormGroup;
  approve = false;
  event: ITimeLineEvent | undefined;
  descriptions: Set<any>;
  descriptionInput: FormControl;
  titleInput: FormControl;
  generalDescription: boolean;

  constructor(
    private dialogRef: NbDialogRef<TimeLineEventEvaluationDialogComponent>,
    private toastService: NbToastrService
  ) {
    this.generalDescription = false;
    this.descriptionInput = new FormControl(null, [Validators.required]);
    this.titleInput = new FormControl(null, [Validators.required]);
    this.descriptions = new Set([]);
    this.editForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      conclusionTitle: new FormControl(null, [Validators.required]),
      conclusionDescription: new FormControl(null, []),
      customerRate: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.approve) {
      this.generalDescription = true;
      this.editForm.get('conclusionTitle')?.setValue('Aprovado!');
    }
    this.updateForm();
  }

  save(): void {
    if (this.editForm.valid) {
      const event = this.getFromForm();
      this.close(event);
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  close(res: any = null): void {
    this.dialogRef.close(res);
  }

  updateForm(): void {
    this.editForm.patchValue({
      id: this.event?.id
    });
  }

  getFromForm(): any {
    const event: ITimeLineEvent = this.editForm.getRawValue();
    event.conclusionDescription = this.generalDescription ? event.conclusionDescription : undefined;
    if (!this.generalDescription) {
      const descriptions: any = {};
      this.descriptions.forEach(descs => {
        descriptions[String(descs.title)] = descs.description;
        return;
      });
      event.cenaDescriptions = descriptions;
    }
    return event;
  }

  addDescription(): void {
    if (this.descriptionInput.valid && this.titleInput.valid) {
      this.descriptions.add({
        title: this.titleInput.value,
        description: this.descriptionInput.value
      });
      this.descriptionInput.reset();
      this.titleInput.reset();
    } else {
      this.descriptionInput.markAsTouched();
      this.titleInput.markAsTouched();
    }
  }

  removeDescription(description: any): void {
    if (!this.descriptions.delete(description)) {
      this.toastService.show('', 'Erro ao excluir', {status: 'danger'});
    }
  }
  trackByFn(index: number, item: any): number {
    return index;
  }
  changeDescriptionMethod(): void {
    this.generalDescription = !this.generalDescription;
    // this.descriptionInput.reset();
    // this.titleInput.reset();
    // this.descriptions.clear();
  }

}
