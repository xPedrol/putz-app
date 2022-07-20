import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {HeadService} from '../../../../services/head.service';
import {takeUntil} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {ServiceAreaTypeArray} from '../../../../models/enums/service-area-type.model';
import {ProjectCaseService} from '../../../../services/project-case.service';
import {IProjectCase} from '../../../../models/project-case.model';

@Component({
  selector: 'app-project-case-crud-update',
  templateUrl: './project-case-crud-update.component.html',
  styleUrls: ['./project-case-crud-update.component.scss']
})
export class ProjectCaseCrudUpdateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subject$: Subject<any>;
  new: boolean;
  submitting: boolean;
  serviceAreaTypes = ServiceAreaTypeArray;

  constructor(
    private ProjectCaseService: ProjectCaseService,
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
      details: new FormControl(null, [Validators.required]),
      createdBy: new FormControl({value: null, disabled: true}),
      lastModifiedBy: new FormControl({value: null, disabled: true}),
      createdDate: new FormControl({value: null, disabled: true}),
      lastModifiedDate: new FormControl({value: null, disabled: true}),
      isActive: new FormControl(null),
      customerName: new FormControl(null, [Validators.required]),
      customerCompany: new FormControl(null, [Validators.required]),
      customerExperience: new FormControl(null, [Validators.required]),
      serviceAreaType: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const ProjectCaseId = Number(params.get('projectCaseId'));
      if (ProjectCaseId) {
        this.getProjectCase(ProjectCaseId);
        this.headService.setTitle('Project Case...');
      } else {
        this.new = true;
        this.headService.setTitle('Novo Project Case');
      }
    });
  }

  getProjectCase(ProjectCaseId: number): void {
    if (ProjectCaseId) {
      this.ProjectCaseService.find(ProjectCaseId).pipe().subscribe((res) => {
        this.updateForm(res.body);
        this.headService.setTitle(`Project Case ${res?.body.name}`);
      });
    }
  }

  updateForm(form: IProjectCase): void {
    this.form.patchValue({
      id: form?.id,
      name: form?.name,
      details: form?.details,
      createdBy: form?.createdBy,
      lastModifiedBy: form?.lastModifiedBy,
      createdDate: form?.createdDate,
      lastModifiedDate: form?.lastModifiedDate,
      isActive: form?.isActive,
      customerCompany: form?.customerCompany,
      customerExperience: form?.customerExperience,
      customerName: form?.customerName,
      serviceAreaType: form?.serviceAreaType
    });
  }

  getProjectCaseFromForm(): IProjectCase {
    const projectCase = this.form.getRawValue();
    projectCase.projectCaseType = {id: projectCase.projectCaseType.id};
    return projectCase;
  }

  save(): void {
    if (this.form.invalid || typeof this.form.get('projectCaseType')?.value !== 'object') {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const ProjectCase = this.getProjectCaseFromForm();
    const req = this.new ? this.ProjectCaseService.create(ProjectCase) : this.ProjectCaseService.update(ProjectCase);
    req.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      if (!this.new) {
        this.updateForm(res.body);
      } else {
        this.router.navigate(['', 'admin', 'projectCases', res?.body.id, 'update']);
      }
    }).add(() => this.submitting = false);
  }

  delete(): void {
    if (!this.new && this.form.get('id')?.value) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: 'ProjectCase: ' + this.form.get('name')?.value ?? '---'
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.ProjectCaseService.delete(this.form.get('id')?.value).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.router.navigate(['', 'admin', 'projectCases', 'dashboard']);
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.ProjectCaseService.clearProjectCase();
    this.subject$.next(null);
    this.subject$.complete();
  }

}
