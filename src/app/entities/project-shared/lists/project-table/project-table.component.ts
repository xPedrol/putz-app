import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISort, Sort} from '../../../../models/table/sort.model';
import {IProject} from '../../../../models/project.model';
import {ITableColumn} from '../../../../models/table.model';
import {ProjectService} from '../../../../services/project.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {SortEvent} from '../../../../directives/sortable.directive';
import {ProjectListMethodsComponent} from '../project-list-methods/project-list-methods.component';
import {takeUntil} from 'rxjs/operators';
import {AccountService} from '../../../../services/account.service';


@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: [
    './project-table.component.scss',
    '../../../../shared/themes/table.scss'
  ]
})
export class ProjectTableComponent extends ProjectListMethodsComponent implements OnInit {
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  projects: IProject[] | undefined;
  columns: ITableColumn[] = [];
  projectsColumn: ITableColumn[] = [
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    {
      title: 'Cliente',
      name: 'client',
      class: 'text-md-start'
    },
    {
      title: 'Status',
      name: 'projectStatus',
      class: 'text-md-start'
    },
    {
      title: 'Início',
      name: 'startDate',
      class: 'text-md-start'
    },
    // {
    //   title: 'Valor',
    //   name: 'valueCalc',
    //   class: 'text-md-start'
    // },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    public projectService: ProjectService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService,
    private accountService: AccountService
  ) {
    super(projectService, toastService, dialogService);
    this.columns = this.projectsColumn;
  }

  ngOnInit(): void {
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      if (account && account?.isAdmin || account?.isManager) {
        this.projectsColumn.unshift({
          title: 'ID',
          name: 'id',
          class: 'text-md-start'
        });
      }
    });
    this.projectService.projects$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req) {
        this.projects = req.projects;
      }
    }, () => {
      this.projects = [];
    });
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }



}
