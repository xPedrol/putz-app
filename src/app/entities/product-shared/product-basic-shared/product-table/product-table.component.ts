import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {ISort, Sort} from "../../../../models/table/sort.model";
import {IProduct} from "../../../../models/product.model";
import {ITableColumn} from "../../../../models/table.model";
import {ProductService} from "../../../../services/product.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {AccountService} from "../../../../services/account.service";
import {takeUntil} from "rxjs/operators";
import {SortEvent} from "../../../../directives/sortable.directive";
import {ICompetence} from "../../../../models/competence.model";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {DialogAction} from "../../../../constants/dialog-action.constants";

export interface IProductOutput {
  product: {
    ancient?: IProduct,
    current?: IProduct
  },
  action: string;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  subject$: Subject<any>;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  products: IProduct[] | undefined;
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
    public productService: ProductService,
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
    this.productService.products$.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.products = req?.body ?? undefined;
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
          this.productService.delete(competenceId).pipe(takeUntil(this.subject$)).subscribe(() => {
            const newCompetence: ICompetence = {...competence};
            newCompetence.isActive = false;
            this.onProjectsChange({product: {ancient: competence, current: newCompetence}, action: 'UPDATE'});
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  onProjectsChange({product, action}: IProductOutput): void {
    if (product && action) {
      let index: number = -1;
      const products: ICompetence[] = this.products ? [...this.products] : [];
      switch (action) {
        case 'DELETE':
          if (product.ancient?.id) {
            index = products.findIndex(p => p.id === product.ancient.id);
            if (index > -1 && products) {
              products.splice(index, 1);
              const size = this.productService.totalCount$.getValue() - 1;
              this.productService.totalCount$.next(size);
            }
          }
          break;
        case 'UPDATE':
          if (product.ancient?.id) {
            index = products.findIndex(p => p.id === product.ancient.id);
            if (index > -1 && products && product?.current) {
              products[index] = product.current;
            }
          }
          break;
      }
      if (products) {
        // this.productService.setProducts({products: products});
      }
      // this.getTimeLineEvents();
    }
  }

  trackProductsById(index: number, item: IProduct): number {
    return item.id as number;
  }

}
