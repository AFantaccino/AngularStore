import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { CartService } from '../../../../services/cart.service';
import { GetProductsListService } from '../../../../services/get-products-list.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-all-products-page',
  templateUrl: './all-products-page.component.html',
  styleUrls: ['./all-products-page.component.scss']
})
export class AllProductsPageComponent implements OnInit {

  products: IProduct[] = [];

  constructor(
    private _cart: CartService,
    private _getProductList: GetProductsListService,
    private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    (this._activatedRoute.firstChild?.paramMap.pipe(
      switchMap(p => this._getProductList.getProductList(+(p.get('category') as string)))
    ) || this._getProductList.getProductList()).subscribe(products => this.products = Object.values(products))
  }

  addToCart(productId: number) {
    this._cart.addProduct(this.products[productId])
  }
}