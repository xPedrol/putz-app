import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, debounceTime, pairwise, startWith, takeUntil, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {NbToastrService} from '@nebular/theme';
import {EMPTY, Observable, of, Subject} from 'rxjs';
import {IProjectRenderItem} from '../../../../../../../src/app/models/project-render-item.model';
import {handleFormErrors} from '../../../../../../../src/app/models/form/form-base.model';
import {
  countryCodes,
  countryMasks,
  findCountyByDialCode
} from "../../../../../../../src/app/constants/country-codes.constants";

@Component({
  selector: 'app-render-base-form',
  template: ``
})
export abstract class RenderBaseFormComponent implements OnInit, OnDestroy {
  public uploadForm: FormGroup;
  protected project: IProject | undefined;
  protected subject$: Subject<any>;

  abstract autoComplete(): void;

  abstract createFromForm(): any;

  abstract formSlug: string;
  useCountryMask = false;
  fieldsForValidation: string[] = [];
  validatedNames: string[] = [];
  countryMasks = countryMasks;
  selectedCountry: any;
  countryCodes = countryCodes;
  protected constructor(
    public toastService: NbToastrService,
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService,
  ) {
    this.subject$ = new Subject();
    this.uploadForm = new FormGroup({});
  }

  ngOnInit(): void {

    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      this.project = project ?? undefined;
      if (this.formSlug && this.fieldsForValidation.length > 0) {
        this.getValidatedNames();
      }
    });
    this.fieldsForValidation.forEach(field => {
      this.uploadForm.get(field)?.valueChanges.pipe(debounceTime(500), startWith(null), pairwise()).subscribe(([previousValue, currentValue]) => {
        if (previousValue !== currentValue) {
          if (!currentValue) {
            this.getValidatedNames();
          } else {
            this.getValidatedNames({search: currentValue});
          }
        }
      });
    });
    if(this.useCountryMask) {
      if (this.uploadForm.get('country')?.value) {
        this.countryChange(this.uploadForm.get('country')?.value);
      }
      this.uploadForm.get('country')?.valueChanges.subscribe(value => {
        if (value) {
          this.countryChange(value);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  onSubmitPrecadastro(): Observable<IProjectRenderItem> {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return EMPTY;
    } else {
      return this.baseOnSubmit(this.createFromForm(), this.formSlug, true);
    }
  }

  onSubmit(projectRenderId?: number, precastro: boolean = false): Observable<IProjectRenderItem> {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return EMPTY;
    } else {
      return this.baseOnSubmit(this.createFromForm(), this.formSlug, precastro, projectRenderId);
    }
  }

  baseOnSubmit(fields: any, formSlug: string, precastro = true, projectRenderId?: number): Observable<IProjectRenderItem> {
    if (this.uploadForm && this.uploadForm.valid) {
      const request = precastro ? this.projectRenderItemService.createFormPreCadastro(fields, formSlug) : this.projectRenderItemService.createFormItems(fields, formSlug, projectRenderId ?? -1);
      return request.pipe(takeUntil(this.subject$), tap((renderItem) => {
        this.toastService.show('', `Item ${renderItem?.name} enviado para renderização`, {status: 'success'});
        this.uploadForm!.reset();
      }), catchError((err) => {
        handleFormErrors(this!.uploadForm, err);
        return of(err);
      }));
    } else {
      return EMPTY;
    }
  }

  getValidatedNames(req?: any): void {
    if (this.formSlug) {
      this.projectRenderItemService.getValidatedNames(this.formSlug, req).pipe(takeUntil(this.subject$)).subscribe(validatedNames => {
        this.validatedNames = validatedNames;
      });
    }
  }

  countryChange(dialCode: any): void {
    this.uploadForm.get('whatsapp')?.reset();
    this.uploadForm.get('phone')?.reset();
    // const aux =  this.uploadForm.get('whatsapp')?.value;
    this.selectedCountry = findCountyByDialCode(dialCode);
    // this.uploadForm.get('whatsapp')?.setValue(aux,{emitEvent:false});
  }
}
