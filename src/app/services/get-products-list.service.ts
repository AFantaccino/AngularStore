import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../modules/products/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class GetProductsListService {

  constructor(private _http: HttpClient) {
  }

  getProductList(query?: number): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`https://fakestore-79fff-default-rtdb.europe-west1.firebasedatabase.app/${query ?
      `products.json?orderBy=\"categoryId\"&equalTo=${query}` :
      `products.json`}`);
  }
}