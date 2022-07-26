import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-render-base-form',
  template: `<ng-content></ng-content>`
})
export abstract class RenderBaseFormComponent implements OnInit, OnDestroy {

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  public uploadForm: FormGroup;

  @Input() public hasWhatsapp: boolean = true;
  @Input() public isPrecadastro: boolean = true;

  protected project: IProject | undefined;
  protected subject$: Subject<any>;

  abstract autoComplete(): void;

  abstract createFromForm(): any;

  abstract formSlug: string;
  renderPass: string | undefined;

  renderSlug: string | undefined;
  projectRenderId: number | undefined;

  useCountryMask = false;
  fieldsForValidation: string[] = [];
  validatedNames: string[] = [];
  countryMasks = countryMasks;
  selectedCountry: any;
  countryCodes = countryCodes;
  location$: Subject<ILocation>;
  defaultCountryDialCode = '+55';
  isLoadingForm = false;

  protected constructor(
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService,
    public geoLocationService: GeoLocationService,
    public elementRef: ElementRef,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastService: ToastService
  ) {
    this.subject$ = new Subject();
    this.location$ = new Subject();
  }

  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      this.project = project ?? undefined;
      if (this.formSlug && this.fieldsForValidation.length > 0) {
        this.getValidatedNames();
      }
    });

    if (this.useCountryMask && this.uploadForm.get('country')) {
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

  onSubmit(): Observable<IProjectRenderItem> {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return EMPTY;
    }

    const fields = this.createFromForm();

    if (this.uploadForm && this.uploadForm.valid) {
      const request = this.isPrecadastro ?
        this.projectRenderItemService.createWithFormAndConfirmation(fields, this.formSlug) :
        this.projectRenderItemService.createWithForm(fields, this.formSlug, this.renderPass);

      return request.pipe(takeUntil(this.subject$), tap(() => {
        this.uploadForm!.reset();
      }), catchError((err) => {
        handleFormErrors(this!.uploadForm, err);
        return of(err);
      }));
    } else {
      return EMPTY;
    }
  }

  validateAndGetRaw(): any {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      this.focusOnInvalid();
      return null;
    }
    return this.createFromForm();
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
    } else {
      return null;
    }
  }

  countryChange(dialCode: any): void {
    //this.uploadForm.get(this.path)?.reset(dialCode);
    this.uploadForm.get('phone')?.reset();
    this.selectedCountry = findCountyByDialCode(dialCode);
  }

  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.geoLocationService.getLocationByLocation(position.coords.latitude, position.coords.longitude).pipe(takeUntil(this.subject$)).subscribe({
  //         next: (value) => {
  //           this.location$.next(value);
  //         }
  //       });
  //     }, (error) => {
  //       console.log(error);
  //     }, {timeout: 10000});
  //   }
  // }

  getCountyByCode(code: string): any {
    code = code.toUpperCase();
    return this.countryCodes.find(country => country.code === code);
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    if (this.instance) {
      const debouncedText$ = text$.pipe(debounceTime(500), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap(term => {
          console.warn(term);
          let request: Observable<string[]> = of([]);
          request = this.getValidatedNames$({search: term});
          return request;
        })
      );
    } else {
      return of([]);
    }
  };

  focusOnInvalid(formGroup: FormGroup = null): void {
    formGroup = formGroup ?? this.uploadForm;
    for (const key of Object.keys(formGroup.controls)) {
      if (formGroup.controls[key].invalid) {
        const invalidControl = this.elementRef.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        if (invalidControl) {
          invalidControl.focus();
          break;
        }
      }
    }
  }

  onSubmitWithForm(): void {
    console.log('Validando 1');
    if (this.uploadForm) {
      const data = this.validateAndGetRaw();
      console.log('Validado :' + data);

      if (!data) return;

      const sendForm = () => {
        console.log('Enviando Form');
        this.isLoadingForm = true;

        this.onSubmit().pipe(takeUntil(this.subject$)).subscribe({
          next: (value) => {
            const renderItemId = value?.id;
            if (renderItemId) {
              this.router.navigate([], {
                queryParams: {
                  renderId: value?.renderProject?.id,
                  renderItemId
                },
                relativeTo: this.activatedRoute,
                queryParamsHandling: ''
              });
            }
          },
          error: () => {
            this.toastService.show({title: '', description: ''}, {classname: 'bg-danger text-light'});
          }
        }).add(() => this.isLoadingForm = false);
      };

      sendForm();
    }
  }

}
