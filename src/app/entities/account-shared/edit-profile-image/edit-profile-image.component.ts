import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {fileTypes} from '../../../constants/file-type.constants';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {IPerson} from '../../../models/person.model';
import {PersonService} from '../../../services/person.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FileSizeWarningComponent} from '../../../shared/components/file-size-warning/file-size-warning.component';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.component.html',
  styleUrls: ['./edit-profile-image.component.scss', '../../../shared/themes/dropzone.scss']
})
export class EditProfileImageComponent implements OnInit, OnDestroy {
  photo: File | null = null;
  @Output() updateUser = new EventEmitter();
  person: IPerson | null;
  subject$ = new Subject();
  maxFileSize = 11000000;

  constructor(
    private accountService: AccountService,
    private personService: PersonService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService
  ) {
    this.person = null;
  }

  ngOnInit(): void {
    this.personService.person$.pipe(takeUntil(this.subject$)).subscribe(person => {
      if (person) {
        this.person = person;
      }
    });
  }

  onSelect(event: any) {
    if ((event.addedFiles[0] as File).size > this.maxFileSize) {
      this.dialogService.open(FileSizeWarningComponent, {
        context: {
          file: event.addedFiles[0],
          maxFileSize: this.maxFileSize
        }
      });
    } else {
      this.photo = event.addedFiles[0];
    }
  }

  onRemove() {
    this.photo = null;
  }

  savePersonPhoto() {
    if (this.photo && fileTypes.includes(this.photo.type) && this.person?.id) {
      this.updateUser.emit(this.photo);
      this.photo = null;
    } else {
      this.toastService.show('', 'Arquivo inválido', {status: 'danger'});
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
