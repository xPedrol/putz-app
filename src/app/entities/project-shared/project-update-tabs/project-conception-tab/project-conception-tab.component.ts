import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {ProjectItemDialogComponent} from '../../project-item-shared/project-item-dialog/project-item-dialog.component';
import {IProjectItem, ProjectItem} from '../../../../models/project-item.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProjectItemService} from '../../../../services/project-item.service';
import {IProjectNegotiationCalcs} from '../../../../models/project-negotiation-calcs.model';
import {NbAccessChecker} from '@nebular/security';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {combineLatest, of, Subject} from 'rxjs';
import {ProjectConceptionFormComponent} from '../../forms/project-conception-form/project-conception-form.component';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {AccountService} from '../../../../services/account.service';
import {Authority} from '../../../../constants/authority.constants';

@Component({
  selector: 'app-project-conception-tab',
  templateUrl: './project-conception-tab.component.html',
  styleUrls: [
    './project-conception-tab.component.scss',
    '../../../../shared/themes/nebular-overrides.scss'
  ],
  providers: [
    ProjectItemService
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProjectConceptionTabComponent implements OnInit, OnDestroy {
  @ViewChild('budgetFormComponent', {static: true}) conceptionForm: ProjectConceptionFormComponent | undefined;
  project: IProject | undefined;
  negotiationCalc: IProjectNegotiationCalcs | undefined;
  advancedConception = false;
  advancedSummary = false;
  subject$: Subject<any>;
  isLoadingPItems = true;
  projectItems: IProjectItem[];
  canEdit = false;

  constructor(
    private projectService: ProjectService,
    private dialogService: NbDialogService,
    public projectItemService: ProjectItemService,
    private accessChecker: NbAccessChecker,
    private toastService: NbToastrService,
    private accountService: AccountService
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.accessChecker.isGranted('edit', 'advanced-conception').pipe(takeUntil(this.subject$)).subscribe((hasAccess) => {
      if (hasAccess) {
        this.advancedSummary = hasAccess;
      }
    });
    combineLatest([
      this.projectService.negotiationCalc$,
      this.projectItemService.projectItems$,
    ]).pipe(takeUntil(this.subject$)).subscribe(([negotiationCalc, projectItemsRes]) => {
      if (negotiationCalc) {
        this.negotiationCalc = negotiationCalc;
      }
      if (projectItemsRes?.projectItems) {
        this.projectItems = this.orderExtraItems(projectItemsRes.projectItems);
      }
    });
    combineLatest([
      this.projectService.project$,
      this.accountService.accountSubject
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, account]) => {
      if (project) {
        this.project = project;
        this.getProjectItems();
      }
      if (project && account) {
        if (account.notHasAnyAuthority([Authority.ADMIN])) {
          this.canEdit = project.canEdit;
        } else {
          this.canEdit = true;
        }
      }
    });
  }

  openProjectItemDialog(): void {
    this.dialogService.open(ProjectItemDialogComponent, {context: {saveItemOnBD: false}}).onClose.pipe(takeUntil(this.subject$)).subscribe(projectItem => {
      if (projectItem) {
        const items: IProjectItem[] = this.projectItems ?? [];
        items.push(projectItem);
        this.getNewItemsCalc(items);
        this.projectItemService.projectItems$.next({projectItems: items});
        this.getNegotiation();
      }
    });
  }

  getNewItemsCalc(items: IProjectItem[]): void {
    if (this.project && this.negotiationCalc) {
      this.project.items = items;
      this.negotiationCalc.itemsSum = this.project.calcItemSum(this.projectItems);
      this.projectService.negotiationCalc$.next(this.negotiationCalc);
    }
  }

  getProjectItems(): void {
    if (this.project?.id) {
      this.isLoadingPItems = true;
      this.projectItemService.queryByProjectId(this.project.id, {schedule: "principal"}).pipe(takeUntil(this.subject$)).subscribe().add(() => this.isLoadingPItems = false);
    }
  }

  onItemChange(obj: { projectItem: IProjectItem, action: 'UPDATE' | 'DELETE' }): void {
    if (obj.projectItem && this.canEdit) {
      let index = -1;
      let items: IProjectItem[] = this.projectItems ? [...this.projectItems] : [];
      switch (obj.action) {
        case 'UPDATE':
          index = items.findIndex(item => item.id === obj.projectItem.id);
          if (index !== -1) {
            items[index] = obj.projectItem;
          }
          break;
        case 'DELETE':
          index = items.findIndex(item => item.id === obj.projectItem.id);
          if (index !== -1) {
            items.splice(index, 1);
          }
          break;
      }
      this.getNewItemsCalc(items);
      this.projectItemService.projectItems$.next({projectItems: items});
      this.getNegotiation();
    }
  }

  handleConceptionForm(): void {
    const projectRaw = this.conceptionForm.validateAndGetRaw();
    if (projectRaw) {
      this.saveConceptionForm(projectRaw);
    }
  }

  saveConceptionForm(project: any): void {
    const logic = () => {
      const items = ProjectItem.clearFieldsForUpdate(this.projectItems);
      if (items && items?.length > 0 && this.project?.id) {
        this.projectItemService.createListItemByProjectId(this.project.id, items).pipe(takeUntil(this.subject$), mergeMap((items) => {
          if (this.project?.id && items) {
            this.toastService.show('', 'Itens salvos com sucesso', {status: 'success'});
            return this.projectService.updateConception(this.project.id, project);
          }
          return of(null);
        })).pipe(takeUntil(this.subject$)).subscribe((params) => {
          if (params) {
            this.toastService.show('', 'Orçamento salvo com sucesso', {status: 'success'});
          }
        });
      }
    };
    if (this.project?.anyApproved) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Esse orçamento já foi aprovado.`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          logic();
        }
      });
    } else {
      logic();
    }

  }

  getNegotiation(): void {
    const negotiationForCalc = this.conceptionForm?.getNegotiation();
    if (this.projectItems && !this.advancedConception && negotiationForCalc) {
      negotiationForCalc.items = ProjectItem.clearFieldsForUpdate(this.projectItems);
    }
    if (negotiationForCalc && ((negotiationForCalc.items && negotiationForCalc.items.length > 0) || this.advancedConception)) {
      const request = this.advancedConception ? this.projectService.getAdvancedNegotiation(negotiationForCalc) : this.projectService.getBasicNegotiation(negotiationForCalc);
      request.pipe(takeUntil(this.subject$)).subscribe((negotiation) => {
        this.negotiationCalc = negotiation;
      });
    } else if (negotiationForCalc) {
      this.toastService.show('', 'O projeto não possui itens', {status: 'danger'});
    }
  }

  trackProjectItemsByFn(index: number, item: any): number {
    return item?.id;
  }

  orderExtraItems(items: IProjectItem[]): IProjectItem[] {
    const extraItems: IProjectItem[] = items.filter((item) => item.isExtraItem);
    const normalItems: IProjectItem[] = items.filter((item) => !item.isExtraItem);
    return [...normalItems, ...extraItems];
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
