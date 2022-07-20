import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {takeUntil} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {CompetenceGuideService} from '../../../../services/competence-guide.service';
import {ICompetenceGuide} from '../../../../models/competence-guide.model';
import {levelArray} from '../../../../models/enums/level.model';
import {FileSizeWarningComponent} from '../../../../shared/components/file-size-warning/file-size-warning.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HeadService} from '../../../../services/head.service';

@Component({
  selector: 'app-competence-guide-crud-update',
  templateUrl: './competence-guide-crud-update.component.html',
  styleUrls: ['./competence-guide-crud-update.component.scss']
})
export class CompetenceGuideCrudUpdateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subject$: Subject<any>;
  new: boolean;
  submitting: boolean;
  levelArray = levelArray;
  file: boolean;
  maxFileSize: number;
  public Editor: any = ClassicEditor;
  public ckEditorconfig: any;

  constructor(
    private competenceGuideService: CompetenceGuideService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    private router: Router,
    private dialogService: NbDialogService,
    private headService:HeadService
  ) {
    this.ckEditorconfig = {
      placeholder: 'Escreva um texto...'
    };
    this.maxFileSize = 11000000;
    this.file = false;
    this.submitting = false;
    this.new = false;
    this.subject$ = new Subject<any>();
    this.form = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      name: new FormControl(null, [Validators.required]),
      slug: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      createdBy: new FormControl({value: null, disabled: true}),
      lastModifiedBy: new FormControl({value: null, disabled: true}),
      createdDate: new FormControl({value: null, disabled: true}),
      lastModifiedDate: new FormControl({value: null, disabled: true}),
      isActive: new FormControl(null),
      fileLink: new FormControl(null),
      file: new FormControl(null),
      isVerified: new FormControl(null),
      level: new FormControl(null, [Validators.required]),
      htmlPage: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const competenceGuideId = Number(params.get('competenceGuideId'));
      if (competenceGuideId) {
        this.getCompetenceGuide(competenceGuideId);
        this.headService.setTitle('Guia...');
      } else {
        this.new = true;
        this.headService.setTitle('Nova Guia');
      }
    });
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  getCompetenceGuide(competenceGuideId: number): void {
    if (competenceGuideId) {
      this.competenceGuideService.findByAdmin(competenceGuideId).pipe().subscribe((res) => {
        this.updateForm(res);
        this.headService.setTitle(`Guia ${res?.name}`);
      });
    }
  }

  updateForm(form: ICompetenceGuide | null): void {
    this.form.patchValue({
      id: form?.id,
      name: form?.name,
      slug: form?.slug,
      description: form?.description,
      createdBy: form?.createdBy,
      lastModifiedBy: form?.lastModifiedBy,
      createdDate: form?.createdDate,
      lastModifiedDate: form?.lastModifiedDate,
      isActive: form?.isActive,
      fileLink: form?.fileLink,
      isVerified: form?.isVerified,
      level: form?.level,
      htmlPage: form?.htmlPage
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const competenceGuide = this.form.getRawValue();
    const req = this.new ? this.competenceGuideService.create(competenceGuide) : this.competenceGuideService.update(competenceGuide);
    req.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      if (!this.new) {
        this.updateForm(res);
      } else {
        this.router.navigate(['', 'admin', 'competences', 'guides', res?.id, 'update']);
      }
    }).add(() => this.submitting = false);
  }

  delete(): void {
    if (!this.new && this.form.get('id')?.value) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: 'Guia de Competência: ' + this.form.get('name')?.value ?? '---'
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.competenceGuideService.delete(this.form.get('id')?.value).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.router.navigate(['', 'admin', 'competences', 'guides', 'dashboard']);
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  changeFileUpload(): void {
    if (!this.file) {
      this.form.get('file')?.setValue(null);
    } else {
      this.form.get('fileLink')?.setValue(null);
    }
  }

  onFileSelect(event: any) {
    if ((event.addedFiles[0] as File).size > this.maxFileSize) {
      this.dialogService.open(FileSizeWarningComponent, {
        context: {
          file: event.addedFiles[0],
          maxFileSize: this.maxFileSize
        }
      });
    } else {
      this.form.get('file')?.setValue(event.addedFiles[0]);
    }
  }

  onFileRemove(): void {
    if (this.form.get('file')?.value) {
      this.form.get('file')?.reset();
    }
  }

  ngOnDestroy(): void {
    this.competenceGuideService.clearCompetenceGuide();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
