import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ProductCrudDashboardComponent
} from "../../../entities/cruds/product-crud-shared/product-crud-dashboard/product-crud-dashboard.component";
import {
  ProductCrudUpdateComponent
} from "../../../entities/cruds/product-crud-shared/product-crud-update/product-crud-update.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProductCrudDashboardComponent
  },
  {
    path: 'new',
    component: ProductCrudUpdateComponent
  },
  {
    path: ':productId/update',
    component: ProductCrudUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAdminRoutingModule {
}
