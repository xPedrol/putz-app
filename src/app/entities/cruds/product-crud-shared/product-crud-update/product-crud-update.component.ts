import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {HeadService} from "../../../../services/head.service";
import {debounceTime, startWith, takeUntil} from "rxjs/operators";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {DialogAction} from "../../../../constants/dialog-action.constants";
import {ProductService} from "../../../../services/product.service";
import {IProduct} from "../../../../models/product.model";
import {levelArray} from "../../../../models/enums/level.model";
import {IProductType} from "../../../../models/product-type.model";
import {ProductTypeService} from "../../../../services/product-type.service";
import {deleteAllUndefinedFields} from "../../../../core/utils/deleteField";

@Component({
  selector: 'app-product-crud-update',
  templateUrl: './product-crud-update.component.html',
  styleUrls: ['./product-crud-update.component.scss']
})
export class ProductCrudUpdateComponent implements OnInit {

  form: FormGroup;
  subject$: Subject<any>;
  new: boolean;
  submitting: boolean;
  levelArray = levelArray;
  productTypes: IProductType[];
  productTypeFieldSearch = 'name.contains';

  constructor(
    private ProductService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    private router: Router,
    private dialogService: NbDialogService,
    private headService: HeadService,
    private productTypeService: ProductTypeService
  ) {
    this.submitting = false;
    this.new = false;
    this.subject$ = new Subject<any>();
    this.form = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      name: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      createdBy: new FormControl({value: null, disabled: true}),
      lastModifiedBy: new FormControl({value: null, disabled: true}),
      createdDate: new FormControl({value: null, disabled: true}),
      lastModifiedDate: new FormControl({value: null, disabled: true}),
      isActive: new FormControl(null),
      productType: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const ProductId = Number(params.get('productId'));
      if (ProductId) {
        this.getProduct(ProductId);
        this.headService.setTitle('Produto...');
      } else {
        this.new = true;
        this.headService.setTitle('Novo Produto');
      }
    });
    this.form.get('productType').valueChanges.pipe(debounceTime(500), startWith(''), takeUntil(this.subject$)).subscribe((value) => {
      if (value === '') {
        this.getProductTypes();
      } else if (!value?.id) {
        this.getProductTypes(value);
      }
    });
  }

  getProduct(ProductId: number): void {
    if (ProductId) {
      this.ProductService.find(ProductId).pipe().subscribe((res) => {
        this.updateForm(res.body);
        this.headService.setTitle(`Product ${res?.body.name}`);
      });
    }
  }

  updateForm(form: IProduct): void {
    this.form.patchValue({
      id: form?.id,
      name: form?.name,
      description: form?.description,
      createdBy: form?.createdBy,
      lastModifiedBy: form?.lastModifiedBy,
      createdDate: form?.createdDate,
      lastModifiedDate: form?.lastModifiedDate,
      isActive: form?.isActive,
      price: form?.price,
      level: form?.level,
      productType: form?.productType
    });
  }

  getProductFromForm(): IProduct {
    const product = this.form.getRawValue();
    product.productType = {id: product.productType.id};
    return product;
  }

  save(): void {
    if (this.form.invalid || typeof this.form.get('productType')?.value !== 'object') {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const Product = this.getProductFromForm();
    const req = this.new ? this.ProductService.create(Product) : this.ProductService.update(Product);
    req.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      if (!this.new) {
        this.updateForm(res.body);
      } else {
        this.router.navigate(['', 'admin', 'products', res?.body.id, 'update']);
      }
    }).add(() => this.submitting = false);
  }

  delete(): void {
    if (!this.new && this.form.get('id')?.value) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: 'Product: ' + this.form.get('name')?.value ?? '---'
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.ProductService.delete(this.form.get('id')?.value).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.router.navigate(['', 'admin', 'products', 'dashboard']);
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  getProductTypes(search?: string): void {
    const query = {page: 0, size: 10};
    query[this.productTypeFieldSearch] = search?.trim() ?? undefined;
    deleteAllUndefinedFields(query);
    this.productTypeService.queryByAdmin(query).pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.productTypes = res.body;
    });
  }

  viewProductTypeHandle(value: string) {
    if (typeof value === 'string') {
      return value;
    }
    return (value as IProductType)?.name;
  }

  ngOnDestroy(): void {
    this.ProductService.clearProduct();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
