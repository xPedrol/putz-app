import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompetenceService} from '../../../../services/competence.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ICompetence} from '../../../../models/competence.model';
import {takeUntil} from 'rxjs/operators';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {HeadService} from '../../../../services/head.service';

@Component({
  selector: 'app-competence-crud-update',
  templateUrl: './competence-crud-update.component.html',
  styleUrls: ['./competence-crud-update.component.scss']
})
export class CompetenceCrudUpdateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subject$: Subject<any>;
  new: boolean;
  submitting: boolean;

  constructor(
    private competenceService: CompetenceService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    private router: Router,
    private dialogService: NbDialogService,
    private headService: HeadService
  ) {
    this.submitting = false;
    this.new = false;
    this.subject$ = new Subject<any>();
    this.form = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      createdBy: new FormControl({value: null, disabled: true}),
      lastModifiedBy: new FormControl({value: null, disabled: true}),
      createdDate: new FormControl({value: null, disabled: true}),
      lastModifiedDate: new FormControl({value: null, disabled: true}),
      isActive: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const competenceId = Number(params.get('competenceId'));
      if (competenceId) {
        this.getCompetence(competenceId);
        this.headService.setTitle('Competência...');
      } else {
        this.headService.setTitle('Nova Competência');
        this.new = true;
      }
    });
  }

  getCompetence(competenceId: number): void {
    if (competenceId) {
      this.competenceService.find(competenceId).pipe().subscribe((res) => {
        this.updateForm(res);
        this.headService.setTitle(`Competência ${res?.name}`);
      });
    }
  }

  updateForm(form: ICompetence | null): void {
    this.form.patchValue({
      id: form?.id,
      name: form?.name,
      description: form?.description,
      createdBy: form?.createdBy,
      lastModifiedBy: form?.lastModifiedBy,
      createdDate: form?.createdDate,
      lastModifiedDate: form?.lastModifiedDate,
      isActive: form?.isActive,
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const competence = this.form.getRawValue();
    const req = this.new ? this.competenceService.create(competence) : this.competenceService.update(competence);
    req.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      if (!this.new) {
        this.updateForm(res);
      } else {
        this.router.navigate(['', 'admin', 'competences', res?.id, 'update']);
      }
    }).add(() => this.submitting = false);
  }

  delete(): void {
    if (!this.new && this.form.get('id')?.value) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: 'Competência: ' + this.form.get('name')?.value ?? '---'
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.competenceService.delete(this.form.get('id')?.value).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.router.navigate(['', 'admin', 'competences', 'dashboard']);
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.competenceService.clearCompetence();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
