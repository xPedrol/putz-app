import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableBase} from "../../../../models/table/table-base.model";
import {Observable, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HeadService} from "../../../../services/head.service";
import {debounceTime, takeUntil} from "rxjs/operators";
import {State} from "../../../../models/table/state.model";
import {IProduct} from "../../../../models/product.model";
import {EntityArrayResponseType, ProductService} from "../../../../services/product.service";

@Component({
  selector: 'app-product-admin-crud-dashboard',
  templateUrl: './product-crud-dashboard.component.html',
  styleUrls: ['./product-crud-dashboard.component.scss']
})
export class ProductCrudDashboardComponent extends TableBase implements OnInit, OnDestroy {

  subject$: Subject<any>;
  products: IProduct[] | undefined;
  defaultListSize = 15;
  productSearch: FormControl;
  loadingProducts = false;

  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private headService: HeadService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.productSearch = new FormControl();
    headService.setTitle('Products');
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.productSearch.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (this.state && this.state.searchTerm?.['name.contains'] !== value) {
        if (value) {
          this.state.searchTerm = {'name.contains': value};
        } else {
          this.state.searchTerm = undefined;
        }
        this.handleNavigation(this.state.getQuery);
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams?.size && queryParams?.page) {
        if (queryParams?.search) {
          this.productSearch.setValue(queryParams.search);
        }
        this.createState(queryParams);
      } else {
        this.createState();
      }
      this.getProducts();
    });
    this.productService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
    this.productService.products$.pipe(takeUntil(this.subject$)).subscribe(res => {
      if (res?.body) {
        this.products = res.body;
      }
    });
  }

  getProducts(query: any = null): void {
    this.loadingProducts = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query!.page--;
    this.handleProduct(this.productService.queryByAdmin(query));
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State({page: 1, size: this.defaultListSize});
    }
    this.defaultListSize = this.state?.size;
  }

  handleProduct(observable: Observable<EntityArrayResponseType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe().add(() => this.loadingProducts = false);
  }


  ngOnDestroy(): void {
    this.productService.clearProducts();
    this.subject$.next(null);
    this.subject$.complete();
  }

  pageChange(event: number): void {
    this.state!.page = event;
    this.handleNavigation(this.state?.getQuery);
  }

  sizeChange(event: number): void {
    this.state!.size = event;
    this.handleNavigation(this.state?.getQuery);
  }
}
