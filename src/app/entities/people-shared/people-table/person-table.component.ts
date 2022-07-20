import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ITableColumn} from '../../../models/table.model';
import {SortEvent} from '../../../directives/sortable.directive';
import {PersonService} from '../../../services/person.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {IPerson} from '../../../models/person.model';
import {AccountService} from '../../../services/account.service';
import {IAccount} from '../../../models/account.model';
import {ISort, Sort} from '../../../models/table/sort.model';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../constants/dialog-action.constants';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {Authority} from '../../../constants/authority.constants';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: [
    './person-table.component.scss',
    '../../../shared/themes/table.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonTableComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  persons: IPerson[] | undefined;
  columns: ITableColumn[] = [];
  account: IAccount | undefined;
  USER_STANDARD_AVATAR = environment.USER_STANDARD_AVATAR;
  projectsColumn: ITableColumn[] = [
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    {
      title: 'Celular',
      name: 'phoneCel',
      class: 'text-md-start'
    },
    {
      title: 'Empresa',
      name: 'company',
      class: 'text-md-start'
    },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    public personService: PersonService,
    private toastService: NbToastrService,
    private accountService: AccountService,
    private dialogService: NbDialogService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.columns = this.projectsColumn;
  }

  ngOnInit(): void {
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      this.account = account ?? undefined;
      if (this.account?.hasAnyAuthority([Authority.MANAGER, Authority.ADMIN])) {
        this.projectsColumn.unshift({
          title: 'ID',
          name: 'id',
          class: 'text-md-start'
        });
        this.changeDetectorRef.detectChanges();
      }
    });
    this.personService.people$.subscribe(req => {
      if (req) {
        this.persons = req.people;
        this.changeDetectorRef.detectChanges();
      }
    });
  }


  deleteProject(person: IPerson): void {
    if (person?.slug) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Usuário: ${person?.name}`
        }
      }).onClose.subscribe((proceed) => {
        if (proceed) {
          this.personService.delete(person.slug ?? '').pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
            this.changeDetectorRef.detectChanges();
          });
        }
      });
    }
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }

  trackPersonsByFn(index: number, item: IPerson): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
