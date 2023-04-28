import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: IProduct[] = []

  constructor(public _cart: CartService) {
  }

  ngOnInit(): void {
    this.cart = this._cart.products
  }

  removeFromCart(id: number) {
    this._cart.removeFromCart(id)
  }
}