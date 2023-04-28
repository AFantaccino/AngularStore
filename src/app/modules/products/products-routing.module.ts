import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsPageComponent } from './components/all-products-page/all-products-page.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [{
  component: AllProductsPageComponent,
  path: 'home'
},{
  component: AllProductsPageComponent,
  path: 'categories',
  children: [
    { path: ':category/products', component: AllProductsPageComponent },
  ]
},
{
  component: CartComponent,
  path: 'cart'
},{
  path: '',
  redirectTo: 'home', 
  pathMatch: 'full'
},{
  component: PageNotFoundComponent,
  path: '**'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
