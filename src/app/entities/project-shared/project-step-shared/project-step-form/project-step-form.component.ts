import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProject} from '../../../../models/project.model';
import {IProjectStep} from '../../../../models/project-step.model';
import {IProduct} from '../../../../models/product.model';
import * as moment from 'moment';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-project-step-form',
  templateUrl: './project-step-form.component.html',
  styleUrls: ['./project-step-form.component.scss']
})
export class ProjectStepFormComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  @Input() projectStep: IProjectStep | undefined;
  @Output() formSave: EventEmitter<IProjectStep>;
  editForm: FormGroup;
  project: IProject | undefined;
  products: IProduct[] | undefined;

  constructor() {
    this.formSave = new EventEmitter<IProjectStep>();
    this.editForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      startDateExpected: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, []),
      // @ts-ignore
      endDateExpected: new FormControl(null, [this.dateValidationExpected]),
      // @ts-ignore
      endDate: new FormControl(null, [this.dateValidation]),
      days: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.projectStep) {
      this.updateForm(this.projectStep);
    }
    this.editForm.get('startDateExpected')?.valueChanges.pipe(debounceTime(600), takeUntil(this.subject$)).subscribe(() => {
      this.editForm.get('endDateExpected')?.updateValueAndValidity();
    });
    this.editForm.get('startDate')?.valueChanges.pipe(debounceTime(600), takeUntil(this.subject$)).subscribe(() => {
      this.editForm.get('endDate')?.updateValueAndValidity();
    });
  }

  emit(): void {
    if (this.editForm.valid) {
      this.formSave.emit(this.getFromForm());
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  getFromForm(): any {
    const step = this.editForm.getRawValue();
    return {
      id: step?.id,
      name: step?.name,
      startDate: moment(step?.startDate),
      days: step?.days,
      startDateExpected: moment(step?.startDateExpected),
      endDate: moment(step?.endDate),
      endDateExpected: moment(step?.endDateExpected)
    };
  }

  updateForm(projectStep: IProjectStep): void {
    this.editForm.patchValue({
      id: projectStep?.id,
      name: projectStep?.name,
      startDate: projectStep.startDate,
      startDateExpected: projectStep.startDateExpected,
      endDateExpected: projectStep.endDateExpected ?? null,
      days: projectStep.days,
      endDate: projectStep.endDate ?? null
    });
  }

  dateValidationExpected = (endDateExpected: FormControl): any => {
    if (this.editForm && endDateExpected.value) {
      if (!moment(endDateExpected.value).isAfter(moment(this.editForm.get('startDateExpected')?.value))) {
        return {
          dataCheck: true
        };
      }
    }
    return null;
  };

  dateValidation = (endDate: FormControl): any => {
    if (this.editForm && endDate.value) {
      if (!moment(endDate.value).isAfter(moment(this.editForm.get('startDate')?.value))) {
        return {
          dataCheck: true
        };
      }
    }
    return null;
  };

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
