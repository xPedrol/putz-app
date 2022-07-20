import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {BasicPersonFormComponent} from '../basic-person-form/basic-person-form.component';
import {PersonService} from '../../../../services/person.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-basic-person-dialog',
  templateUrl: './basic-person-dialog.component.html',
  styleUrls: ['./basic-person-dialog.component.scss']
})
export class BasicPersonDialogComponent implements OnInit, OnDestroy {
  subject: Subject<any>;
  @ViewChild('basicPersonFormComponent', {static: false}) basicPersonFormComponent: BasicPersonFormComponent | undefined;

  constructor(
    private dialogRef: NbDialogRef<BasicPersonDialogComponent>,
    private personService: PersonService,
    private toastService: NbToastrService
  ) {
    this.subject = new Subject<any>();
  }

  ngOnInit(): void {
  }

  close(res: any = null): void {
    this.dialogRef.close(res);
  }

  save(): void {
    if (this.basicPersonFormComponent) {
      const formData = this.basicPersonFormComponent.getFormData();
      if (formData) {
        this.personService.create(formData).pipe(takeUntil(this.subject)).subscribe(person => {
          if (person) {
            this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
            this.close(person);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subject.next(null);
    this.subject.complete();
  }
}
