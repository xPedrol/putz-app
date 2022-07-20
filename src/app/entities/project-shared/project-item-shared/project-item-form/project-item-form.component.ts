import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {IProjectStep} from '../../../../models/project-step.model';
import {ProjectItemService} from '../../../../services/project-item.service';
import {State} from '../../../../models/table/state.model';
import {IProduct} from '../../../../models/product.model';
import {ProductService} from '../../../../services/product.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {IProjectItem} from '../../../../models/project-item.model';
import {PersonService} from '../../../../services/person.service';
import {IPerson} from '../../../../models/person.model';
import {Subject} from 'rxjs';
import {ScheduleService} from '../../../../services/schedule.service';
import {ProjectStepService} from '../../../../services/project-step.service';

@Component({
  selector: '   app-project-item-form',
  templateUrl: './project-item-form.component.html',
  styleUrls: ['./project-item-form.component.css']
})
export class ProjectItemFormComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  @Input() projectItem: IProjectItem | undefined;
  editForm: FormGroup;
  project: IProject | undefined;
  projectSteps: IProjectStep[] | undefined;
  products: IProduct[] | undefined;
  productSearch: FormControl;
  freelancerSearch: FormControl;
  people: IPerson[] | undefined;

  constructor(
    private projectService: ProjectService,
    private projectItemService: ProjectItemService,
    private productService: ProductService,
    private personService: PersonService,
    private scheduleService: ScheduleService,
    private projectStepService: ProjectStepService
  ) {
    this.productSearch = new FormControl();
    this.freelancerSearch = new FormControl();
    this.editForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(64), Validators.required]),
      description: new FormControl(null),
      // projectId: new FormControl(null, [Validators.required]),
      freelancerId: new FormControl(null, []),
      projectStepId: new FormControl(null, [Validators.required]),
      productId: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      valueBase: new FormControl(null, [Validators.required]),
      isOpportunity: new FormControl(null, []),
      itemIndex: new FormControl(null, []),
      quantity: new FormControl({value: 1, disabled: true}, [Validators.required]),
      isExtraItem: new FormControl({value: null, disabled: true})
    });
  }

  ngOnInit(): void {
    this.getParams();
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  getParams(): void {
    this.getFreelancers();
    if (this.projectItem) {
      this.updateForm(this.projectItem);
    }
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        this.getScheduleNames();
        this.getProducts();
      }
    });
    this.freelancerSearch.valueChanges.pipe(takeUntil(this.subject$), debounceTime(300)).subscribe((value: string | IPerson) => {
      if (typeof value === 'string') {
        this.editForm.get('freelancerId')?.setValue(null);
        this.getFreelancers(value);
      } else {
        this.editForm.get('freelancerId')?.setValue(value?.id);
      }
    });
    this.productSearch.valueChanges.pipe(takeUntil(this.subject$), debounceTime(300)).subscribe(value => {
      if (typeof value === 'string') {
        this.editForm.patchValue({
          value: null,
          valueBase: null,
          name: null,
          description: null,
          productId: null
        });
        const search = {search: value};
        this.getProducts(search);
      } else {
        if (!this.projectItem) {
          this.editForm.patchValue({
            value: value?.price,
            valueBase: value?.price,
            name: value?.name,
            description: value?.description,
            isExtraItem: value?.productType?.isExtraItem
          });
        }
        this.editForm.get('productId')?.setValue(value?.id);
      }
    });
    this.editForm.get('isExtraItem').valueChanges.pipe(takeUntil(this.subject$)).subscribe(value => {
      if (value) {
        this.editForm.get('quantity').enable();
      } else {
        this.editForm.get('quantity').disable();
      }
    });
  }

  getScheduleNames(): void {
    if (this.project?.id) {
      this.scheduleService.findScheduleNamesByProjectId(this.project.id).pipe(takeUntil(this.subject$)).subscribe(names => {
        if (names[0]) {
          this.getProjectStepsBySchedule(names[0]);
        }
      });
    }
  }

  getProjectStepsBySchedule(scheduleName: string): void {
    const ids = {
      projectId: this.project?.id,
      scheduleName
    };
    this.projectStepService.queryByScheduleName(ids).pipe(takeUntil(this.subject$)).subscribe({
      next: ({projectSteps}) => {
        this.projectSteps = projectSteps;
      }
    });

  }

  updateForm(projectItem: IProjectItem): void {
    this.editForm.patchValue({
      id: projectItem?.id,
      name: projectItem?.name,
      description: projectItem?.id,
      // projectId: new FormControl(null, [Validators.required]),
      projectStepId: projectItem?.projectStep?.id,
      productId: projectItem?.product?.id,
      valueBase: projectItem?.valueBase,
      value: projectItem?.value,
      itemIndex: projectItem?.itemIndex,
      isOpportunity: projectItem?.isOpportunity,
      freelancerId: projectItem?.freelancer?.id,
      quantity: projectItem?.quantity,
      isExtraItem: projectItem?.isExtraItem
    });
    if (projectItem?.isExtraItem) {
      this.editForm.get('quantity').enable();
    } else {
      this.editForm.get('quantity').disable();
    }
    this.freelancerSearch.setValue(projectItem?.freelancer?.name);
    if (projectItem?.product) {
      this.productSearch.setValue(projectItem.product?.name);
    }
  }

  validateAndGetRaw(): any {
    if (this.editForm.valid) {
      return this.getFromForm();
    }
    this.editForm.markAllAsTouched();
    return null;
  }

  getFromForm(): IProjectItem {
    const projectItemForm = this.editForm.getRawValue();
    const projectItem: IProjectItem = {};
    projectItem.id = projectItemForm?.id ?? undefined;
    projectItem.product = projectItemForm?.productId ? {id: projectItemForm.productId} : undefined;
    // @ts-ignore
    projectItem.projectStep = projectItemForm?.projectStepId ? {id: projectItemForm.projectStepId} : undefined;
    projectItem.description = projectItemForm?.description;
    projectItem.name = projectItemForm?.name;
    projectItem.value = projectItemForm?.value;
    projectItem.isOpportunity = projectItemForm?.isOpportunity;
    projectItem.itemIndex = projectItemForm?.itemIndex ?? undefined;
    projectItem.valueBase = projectItemForm?.valueBase ?? projectItem.value;
    projectItem.freelancer = projectItemForm?.freelancerId ? {id: projectItemForm?.freelancerId} : undefined;
    projectItem.quantity = projectItemForm?.quantity ?? 1;
    projectItem.isExtraItem = projectItemForm?.isExtraItem ?? false;
    // @ts-ignore
    projectItem.project = this.project?.id ? {id: this.project.id} : undefined;
    return projectItem;
  }

  getProducts(search: any = undefined): void {
    const state = new State({
      page: 0,
      size: 10,
      searchTerm: search
    });
    this.productService.query(state.getQuery).pipe(takeUntil(this.subject$)).subscribe(products => {
      if (products) {
        this.products = products;
      }
    });
  }

  projectItemHandleDisplay(value: any) {
    if (typeof value !== 'string') {
      return value?.name;
    } else {
      return value;
    }
  }

  freelancerHandleDisplay(person: IPerson | string): string {
    if (typeof person !== 'string') {
      return person?.name ?? '';
    } else {
      return person;
    }
  }


  getFreelancers(search: string = ''): void {
    this.personService.query('FREELANCER', {
      page: 0,
      size: 10,
      search: search ?? ''
    }).pipe(takeUntil(this.subject$)).subscribe(({people}) => {
      if (people) {
        this.people = people;
      }
    });
  }
}
