import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ISort, Sort} from '../../../../../models/table/sort.model';
import {ITableColumn} from '../../../../../models/table.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AccountService} from '../../../../../services/account.service';
import {takeUntil} from 'rxjs/operators';
import {SortEvent} from '../../../../../directives/sortable.directive';
import {ICompetence} from '../../../../../models/competence.model';
import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../../constants/dialog-action.constants';
import {
  ICompetenceOutput
} from '../../../../competence-shared/competence-list-shared/competence-table/competence-table.component';
import {getProjectIndexByField} from '../../../../../core/utils/getIndexByField';
import {ITag} from '../../../../../models/tag.model';
import {TagService} from '../../../../../services/tag.service';

@Component({
  selector: 'app-tag-crud-table',
  templateUrl: './tag-crud-table.component.html',
  styleUrls: ['./tag-crud-table.component.scss']
})
export class TagCrudTableComponent implements OnInit {
  subject$: Subject<any>;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  tags: ITag[] | undefined;
  columns: ITableColumn[] = [];
  projectsColumn: ITableColumn[] = [
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    {
      title: 'Descrição',
      name: 'description',
      class: 'text-md-start'
    },
    {
      title: 'Criação',
      name: 'createdDate',
      class: 'text-md-start'
    },
    {
      title: 'Modificação',
      name: 'lastModifiedDate',
      class: 'text-md-start'
    },
    {
      title: 'Ativo',
      name: 'isActive',
      class: 'text-md-start'
    },
    // {
    //   title: 'Produtos',
    //   name: 'products',
    //   class: 'text-md-start'
    // },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    public tagService: TagService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService,
    private accountService: AccountService
  ) {
    this.columns = this.projectsColumn;

    this.subject$ = new Subject();
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
    this.tagService.tags$.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.tags = req?.tags ?? undefined;
    });
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }

  deleteCompetence(competence: ICompetence | any): void {
    const competenceId = competence?.id;
    if (competenceId && competence) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Competência: ${competence?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.tagService.delete(competenceId).pipe(takeUntil(this.subject$)).subscribe(() => {
            const newCompetence: ICompetence = {...competence};
            newCompetence.isActive = false;
            this.onProjectsChange({tag: {ancient: competence, current: newCompetence}, action: 'UPDATE'});
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  onProjectsChange({tag, action}: ICompetenceOutput): void {
    if (tag && action) {
      let index: number | null = null;
      const tags: ICompetence[] | undefined = this.tagService.tags$.getValue()?.tags;
      switch (action) {
        case 'DELETE':
          if (tag.ancient?.id) {
            index = getProjectIndexByField('id', tag.ancient.id, tags);
            if (typeof index === 'number' && tags) {
              tags.splice(index, 1);
              const size = this.tagService.totalCount$.getValue() - 1;
              this.tagService.totalCount$.next(size);
            }
          }
          break;
        case 'UPDATE':
          if (tag.ancient?.id) {
            index = getProjectIndexByField('id', tag.ancient.id, tags);
            if (typeof index === 'number' && tags && tag?.current) {
              tags[index] = tag.current;
            }
          }
          break;
      }
      if (tags) {
        this.tagService.setTags({tags: tags});
      }
      // this.getTimeLineEvents();
    }
  }
  trackTagsById(index: number, item: ITag): number {
    return item.id as number;
  }

}
