import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {takeUntil} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {TagService} from '../../../../services/tag.service';
import {ITag} from '../../../../models/tag.model';
import {HeadService} from '../../../../services/head.service';

@Component({
  selector: 'app-tag-crud-update',
  templateUrl: './tag-crud-update.component.html',
  styleUrls: ['./tag-crud-update.component.scss']
})
export class TagCrudUpdateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subject$: Subject<any>;
  new: boolean;
  submitting: boolean;

  constructor(
    private tagService: TagService,
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
      const tagId = Number(params.get('tagId'));
      if (tagId) {
        this.getTag(tagId);
        this.headService.setTitle('Tag...');
      } else {
        this.new = true;
        this.headService.setTitle('Nova Tag');
      }
    });
  }

  getTag(tagId: number): void {
    if (tagId) {
      this.tagService.find(tagId).pipe().subscribe((res) => {
        this.updateForm(res);
        this.headService.setTitle(`Tag ${res?.name}`);
      });
    }
  }

  updateForm(form: ITag | null): void {
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
    const tag = this.form.getRawValue();
    const req = this.new ? this.tagService.create(tag) : this.tagService.update(tag);
    req.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      if (!this.new) {
        this.updateForm(res);
      } else {
        this.router.navigate(['', 'admin', 'tags', res?.id, 'update']);
      }
    }).add(() => this.submitting = false);
  }

  delete(): void {
    if (!this.new && this.form.get('id')?.value) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: 'Tag: ' + this.form.get('name')?.value ?? '---'
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.tagService.delete(this.form.get('id')?.value).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.router.navigate(['', 'admin', 'tags', 'dashboard']);
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.tagService.clearTag();
    this.subject$.next(null);
    this.subject$.complete();
  }

}
