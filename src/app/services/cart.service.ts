import { Injectable } from '@angular/core';
import { IProduct } from '../modules/products/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private _cart: IProduct[] = []
  private _cartTotal: number = 0;

  get products(): IProduct[] {
    return this._cart
  }

  get cartLenght(): number {
    return this._cart.length
  }

  get cartTotal(): number {
    return this._cartTotal
  }

  addProduct(product: IProduct) {
    this._cartTotal += product.price
    this._cart.push(product)
  }

  removeFromCart(id: number): void {
    this._cartTotal -= this._cart[id].price
    this._cart.splice(id, 1)
  }
}