import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: "products", component: ProductListComponent},
      { path: "products/:id", 
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent},
    ]),
  ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule { }
