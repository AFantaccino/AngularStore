import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsPageComponent } from './components/all-products-page/all-products-page.component';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AllProductsPageComponent,
    CartComponent,
  ], 
  exports: [
    AllProductsPageComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
