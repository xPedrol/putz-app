import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {IPersonBasic, PersonBasic} from '../../../../models/basics/person.basic';
import {PersonService, queryType} from '../../../../services/person.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {IState, State} from '../../../../models/table/state.model';
import {IPerson} from '../../../../models/person.model';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {ConceptionCreation, IConceptionCreation} from '../../../../models/conception-creation.model';
import {ITag} from '../../../../models/tag.model';
import {NbDialogService, NbTagComponent} from '@nebular/theme';
import {TagService} from '../../../../services/tag.service';
import {AccountService} from '../../../../services/account.service';
import {Authority} from '../../../../constants/authority.constants';
import {
  BasicPersonDialogComponent
} from '../../../people-shared/person-basic-shared/basic-person-dialog/basic-person-dialog.component';
import {IAccount} from '../../../../models/account.model';
import {ProjectStatus} from "../../../../models/enums/project-status.model";
import * as moment from "moment";

@Component({
  selector: 'app-project-general-form',
  templateUrl: './project-general-form.component.html',
  styleUrls: ['./project-general-form.component.scss']
})
export class ProjectGeneralFormComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() canEdit: boolean;
  @Input() project: IProject | undefined;
  subject$ = new Subject();
  editForm: FormGroup;

  agencyPeople: IPersonBasic[] | undefined;
  managerPeople: IPersonBasic[] | undefined;
  clientPeople: IPersonBasic[] | undefined;
  vendorPeople: IPersonBasic[] | undefined;

  searchState: IState;
  trees: Set<ITag> = new Set([]);
  tagInput: FormControl;
  filteredOptions: ITag[] | undefined;
  account: IAccount | undefined;

  constructor(
    private projectService: ProjectService,
    private personService: PersonService,
    private tagService: TagService,
    private accountService: AccountService,
    private changeDetector: ChangeDetectorRef,
    private dialogService: NbDialogService,
  ) {
    this.tagInput = new FormControl();
    this.searchState = new State({
      page: 0,
      size: 15
    });
    this.editForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
      slug: new FormControl(null, [Validators.minLength(3), Validators.maxLength(64)]),
      description: new FormControl(null, [Validators.minLength(3), Validators.maxLength(512)]),
      agency: new FormControl(null, [Validators.required]),
      manager: new FormControl(null, [Validators.required]),
      client: new FormControl(null, [Validators.required]),
      vendor: new FormControl(null, [Validators.required]),
      canceledDate: new FormControl({value: null, disabled: true}),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      videoUrlLowRes: new FormControl(null, [Validators.minLength(3), Validators.maxLength(512)]),
      videoUrlHiRes: new FormControl(null, [Validators.minLength(3), Validators.maxLength(512)]),
      cancelUser: new FormControl(null),
      tags: new FormControl(null),
      tributeAncine: new FormControl(null),
    });
  }

  ngAfterViewInit(): void {
    if (this.project) {
      this.updateForm(this.project);
    }
    combineLatest([
      this.accountService.accountSubject,
    ]).pipe(takeUntil(this.subject$)).subscribe(([account]) => {
      this.account = account ?? undefined;
    });
    this.onSearchFocus('CLIENT', 'client');
    this.onSearchFocus('MANAGER', 'manager');
    this.onSearchFocus('AGENCY', 'agency');
    this.onSearchFocus('VENDOR', 'vendor');
    this.editForm.get('client')?.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value: string | IPerson) => {
      this.handleFormValueChanges(value, 'client');
    });
    this.editForm.get('manager')?.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value: string | IPerson) => {
      this.handleFormValueChanges(value, 'manager');
    });
    this.editForm.get('agency')?.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value: string | IPerson) => {
      this.handleFormValueChanges(value, 'agency');
    });
    this.editForm.get('vendor')?.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value: string | IPerson) => {
      this.handleFormValueChanges(value, 'vendor');
    });
    this.getTags();
    this.tagInput.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe(value => {
      if (value && typeof value === 'string') {
        this.getTags({size: 10, page: 0, search: value});
      } else if (value === '') {
        this.getTags({size: 10, page: 0});
      }
    });
  }

  disableForm(): void {
    this.editForm.disable();
    if (this.project) {
      if (this.project.projectStatus !== ProjectStatus.CONCEPTION &&
        this.project.projectStatus !== ProjectStatus.BRIEFING) {
        this.editForm.get('description')?.enable();
        this.editForm.get('name')?.enable();
      }
    }
  }

  enableForm(): void {
    this.editForm.enable();
  }

  handleFormValueChanges(value: string | IPerson, formControlName: string): void {
    if (typeof value === 'string' && value !== '') {
      this.searchState.searchTerm = {search: value};
      this.handlePeople(this.personService.queryWithoutPagination(formControlName.toUpperCase(), this.searchState.getQuery, false), formControlName);
    }
  }

  onSearchFocus(personRole: string, formControlName: string): void {
    this.searchState.searchTerm = null;
    this.handlePeople(this.personService.queryWithoutPagination(personRole, this.searchState.getQuery, false), formControlName);
  }

  handlePeople(peopleObservable: Observable<queryType>, formControlName: string): void {
    peopleObservable.pipe(takeUntil(this.subject$)).subscribe((res) => {
      if (res && res?.people) {
        switch (formControlName) {
          case 'client':
            this.clientPeople = res.people;
            break;
          case 'manager':
            this.managerPeople = res.people;
            break;
          case 'vendor':
            this.vendorPeople = res.people;
            break;
          case 'agency':
            this.agencyPeople = res.people;
            break;
        }
      }
      this.changeDetector.detectChanges();
    });
  }

  validateAndGetRaw(): IConceptionCreation | IProject {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      this.changeDetector.detectChanges();
    } else {
      this.editForm.markAsUntouched();
      this.changeDetector.detectChanges();
      return this.project?.modelForConception ? this.createConceptionCreation() : this.updateProject();
    }
    return null;
  }

  createConceptionCreation(): IConceptionCreation {
    return new ConceptionCreation(
      {
        agency: this.editForm.get('agency')?.value?.id ? {id: this.editForm.get('agency')?.value?.id} : undefined,
        client: this.editForm.get('client')?.value?.id ? {id: this.editForm.get('client')?.value?.id} : undefined,
        manager: this.editForm.get('manager')?.value?.id ? {id: this.editForm.get('manager')?.value?.id} : undefined,
        vendor: this.editForm.get('vendor')?.value?.id ? {id: this.editForm.get('vendor')?.value?.id} : undefined,
        description: this.editForm.get('description')?.value,
        name: this.editForm.get('name')?.value,
        // @ts-ignore
        modelProject: this.project?.modelForConception ? {id: this.project?.id} : undefined,
        id: this.project?.modelForConception ? undefined : this.editForm.get('id')?.value,
        tributeAncine: this.editForm.get('tributeAncine')?.value,
      }
    );
  }

  updateProject(): IProject | any {
    return {
      ...this.project,
      agency: {id: this.editForm.get('agency')?.value?.id},
      client: {id: this.editForm.get('client')?.value?.id},
      manager: {id: this.editForm.get('manager')?.value?.id},
      vendor: {id: this.editForm.get('vendor')?.value?.id},
      description: this.editForm.get('description')?.value,
      name: this.editForm.get('name')?.value,
      id: this.editForm.get('id')?.value,
      canceledDate: this.editForm.get('canceledDate')?.value,
      startDate: this.editForm.get('startDate')?.value,
      endDate: this.editForm.get('endDate')?.value,
      videoUrlLowRes: this.editForm.get('videoUrlLowRes')?.value,
      videoUrlHiRes: this.editForm.get('videoUrlLowRes')?.value,
      cancelUser: this.editForm.get('cancelUser')?.value ? {id: this.editForm.get('cancelUser')?.value} : undefined,
      negotiationCalc: undefined,
      projectSteps: undefined,
      tags: this.trees.size > 0 ? Array.from(this.trees) : [],
      tributeAncine: this.editForm.get('tributeAncine')?.value,
    };
  }

  updateForm(project: IProject): void {
    this.editForm.get('option')?.setValue(project.client, {
      onlySelf: true,
      emitEvent: false,
    });
    this.editForm.get('id')!.setValue(project.modelForConception ? null : project.id);
    this.editForm.get('name')!.setValue(!this.project?.modelForConception ? project.name : null, {
      onlySelf: true,
      emitEvent: false,
    });
    this.editForm.get('tributeAncine')!.setValue(project?.tributeAncine);
    this.editForm.get('slug')!.setValue(!this.project?.modelForConception ? project.slug : null);
    this.editForm.get('description')!.setValue(project.description);
    this.editForm.get('startDate')!.setValue(project?.startDate?project?.startDate:moment());
    this.editForm.get('endDate')!.setValue(project?.endDate);
    this.editForm.get('client')!.setValue(project.client);
    let agency;
    if (this.account.hasAnyAuthority([Authority.AGENCY]) && !this.account.hasHighAuthority()) {
      agency = new PersonBasic({
        name: `${this.account?.firstName} ${this.account?.lastName}`,
        id: this.account?.id
      });
      this.editForm.get('agency')!.disable();
    } else {
      agency = project.agency;
    }
    this.editForm.get('agency')!.setValue(agency);

    if (!this.account.hasHighAuthority() && project?.manager) {
      this.editForm.get('manager')?.disable();
    }
    if (this.project.manager) {
      this.editForm.get('manager')!.setValue(project.manager);
    }


    let vendor;
    if (this.account.hasAnyAuthority([Authority.VENDOR]) && !this.account.hasHighAuthority()) {
      vendor = new PersonBasic({
        name: `${this.account?.firstName} ${this.account?.lastName}`,
        id: this.account?.id
      });
      this.editForm.get('vendor')!.disable();
    } else {
      vendor = project.vendor;
    }
    this.editForm.get('vendor')!.setValue(vendor);
    this.trees = new Set(project?.tags);
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  viewHandle(value: any) {
    if (typeof value === 'string') {
      return value;
    } else {
      return value?.name;
    }
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees.forEach(value => {
      if (value?.name === tagToRemove.text) {
        this.trees.delete(value);
      }
    });
  }

  onTagAdd(value: ITag): void {
    const tag = {
      id: value?.id,
      name: value?.name
    };
    let exist = false;
    this.trees.forEach(tag1 => {
      if (tag1?.name === tag?.name) {
        exist = true;
      }
    });
    if (tag && !exist) {
      this.trees.add(tag);
    }
  }

  getTags(query: any = null): void {
    query = query ?? {size: 10, page: 0};
    this.tagService.query(query).pipe(takeUntil(this.subject$), debounceTime(500)).subscribe(res => {
      if (res && res?.tags)
        this.filteredOptions = res.tags;
      this.changeDetector.detectChanges();
    });
  }

  onSelectionChange(value: any) {
    if (typeof value !== 'string') {
      this.tagInput.setValue('');
      this.onTagAdd(value);
    }
  }

  openBasicPersonDialog(): void {
    this.dialogService.open(BasicPersonDialogComponent).onClose.pipe(takeUntil(this.subject$)).subscribe(person => {
      if (person) {
        this.editForm.get('client')!.setValue(person, {emitEvent: false});
        this.changeDetector.detectChanges();
      }
    });
  }

  clientTrackBy(index: number): any {
    return index;
  }

  vendorTrackBy(index: number): any {
    return index;
  }

  agencyTrackBy(index: number): any {
    return index;
  }

  managerTrackBy(index: number): any {
    return index;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const verifyCanEdit = (): void => {
      if (this.canEdit) {
        this.enableForm();
      } else {
        this.disableForm();
      }
    };
    if (changes.canEdit?.currentValue !== changes.canEdit?.previousValue) {
      verifyCanEdit();
    }
    if (changes.project?.currentValue !== changes.project?.previousValue && !changes.project?.firstChange) {
      this.updateForm(this.project);
      verifyCanEdit();
    }
  }
}
