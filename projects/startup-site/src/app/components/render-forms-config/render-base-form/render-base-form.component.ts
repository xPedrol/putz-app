import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {EMPTY, merge, Observable, of, OperatorFunction, Subject} from 'rxjs';
import {IProjectRenderItem} from '../../../../../../../src/app/models/project-render-item.model';
import {handleFormErrors} from '../../../../../../../src/app/models/form/form-base.model';
import {
  countryCodes,
  countryMasks,
  findCountyByDialCode
} from '../../../../../../../src/app/constants/country-codes.constants';
import {ILocation} from '../../../models/location.model';
import {GeoLocationService} from '../../../services/geo-location.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-render-base-form',
  template: ``
})
export abstract class RenderBaseFormComponent implements OnInit, OnDestroy {
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
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
  location$: Subject<ILocation>;
  defaultCountryDialCode = '+55';
  protected constructor(
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService,
    public geoLocationService: GeoLocationService
  ) {
    this.subject$ = new Subject();
    this.location$ = new Subject();
    this.uploadForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      this.project = project ?? undefined;
      if (this.formSlug && this.fieldsForValidation.length > 0) {
        this.getValidatedNames();
      }
    });

    if (this.useCountryMask) {
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

  getValidatedNames$(req?: any): Observable<string[]> {
    if (this.formSlug) {
      return this.projectRenderItemService.getValidatedNames(this.formSlug, req);
    }else {
      return null;
    }
  }

  private path = 'whatsapp';

  countryChange(dialCode: any): void {
    //this.uploadForm.get(this.path)?.reset(dialCode);
    this.uploadForm.get('phone')?.reset();
    this.selectedCountry = findCountyByDialCode(dialCode);
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoLocationService.getLocationByLocation(position.coords.latitude, position.coords.longitude).pipe(takeUntil(this.subject$)).subscribe({
          next: (value) => {
            this.location$.next(value);
          }
        });
      }, (error) => {
        console.log(error);
      }, {timeout: 10000});
    }
  }

  getCountyByCode(code: string): any {
    code = code.toUpperCase();
    return this.countryCodes.find(country => country.code === code);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    if(this.instance) {
      const debouncedText$ = text$.pipe(debounceTime(500), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap(term => {
          let request: Observable<string[]> = of([]);
          if (!term || term.length < 3 ||  term === '') {
            //request = this.getValidatedNames$();
          } else {
            request = this.getValidatedNames$({search: term});
          }
          return request;
        })
      );
    }else{
      return of([]);
    }
  };


}
