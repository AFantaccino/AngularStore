import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/modules/products/interfaces/category';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  categories!: ICategory[];

  constructor(private _http: HttpClient, private _cart: CartService, public account: AccountService) {
  }

  ngOnInit(): void {
    this._http.get<ICategory[]>('https://fakestore-79fff-default-rtdb.europe-west1.firebasedatabase.app/categories.json').subscribe(data => this.categories = data)
  }

  get cartAmount() {
    return this._cart.cartLenght
  }

  get totalPrice() {
    return this._cart.cartTotal
  }
}