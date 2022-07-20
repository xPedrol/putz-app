import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormControl, Validators} from '@angular/forms';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {IProject} from '../../../models/project.model';
import {State} from '../../../models/table/state.model';
import {ProjectService} from '../../../services/project.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-project-select-model-dialog',
  templateUrl: './project-select-model-dialog.component.html',
  styleUrls: ['./project-select-model-dialog.component.scss']
})
export class ProjectSelectModelDialogComponent implements OnInit, OnDestroy {
  productInput: FormControl;
  projectModel: IProject | undefined;
  projectModels: IProject[] | undefined;
  submitted = false;
  subject$: Subject<any>;

  constructor(
    private dialogRef: NbDialogRef<ProjectSelectModelDialogComponent>,
    private projectService: ProjectService
  ) {
    this.subject$ = new Subject<any>();
    this.productInput = new FormControl(null, [Validators.required]);
  }

  ngOnInit(): void {
    this.getModels();
    this.productInput.valueChanges.pipe(debounceTime(300), takeUntil(this.subject$)).subscribe(value => {
      if (typeof value === 'string') {
        this.projectModel = undefined;
        const search = {search: value};
        this.getModels(search);
        // this.getProducts(search);
      } else {
        this.projectModel = value;
        this.getModels();
      }
    });
  }

  close(res: any = null): void {
    this.dialogRef.close(res);
  }

  getModels(search: any = undefined): void {
    const state = new State({
      page: 0,
      size: 10,
      searchTerm: search
    });
    const query = state.getQuery;
    query!.page--;
    this.projectService.findProjectsWithStatus('models', query).pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req?.projects) {
        this.projectModels = req.projects;
      }
    });
  }

  viewHandle(value: any) {
    if (typeof value !== 'string') {
      return value?.name;
    } else {
      return value;
    }
  }

  save(): void {
    this.submitted = true;
    if (this.productInput.valid && this.projectModel) {
      this.close(this.projectModel);
    } else {
      this.productInput.markAsTouched();
    }
  }

  trackProjectModelsByFn(index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
