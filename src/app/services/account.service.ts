import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { IUser } from '../modules/account/interfaces/user';
import { IAuthResponse } from '../modules/account/interfaces/authResponse';
import { IRetrieveUserResponse } from '../modules/account/interfaces/retrieveUserResponse';
import { User } from '../modules/account/model/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _loggedUser$ = new BehaviorSubject<User | undefined>(undefined)
  public loggedUser$ = this._loggedUser$.asObservable();

  private _tokenName = 'idToken'
  private API_KEY = 'AIzaSyARB6Tm9Gu5SxGO8xOHxIu1EGYjkX9olFs'

  public token = localStorage.getItem(this._tokenName);

  constructor(private _http: HttpClient) {

    if (this.token) {
      if (!this.token)
        localStorage.removeItem(this._tokenName)
      else {
        this.retrieveUsetData().subscribe({
          next: (resp) => {

            const user = new User(
              resp.users[0].email,
              resp.users[0].localId,
            )

            this._loggedUser$.next(user)
          }
        })
      }
    }
  }

  accessUser(resp: IAuthResponse) {

    const user = new User(
      resp.email,
      resp.localId
    )

    this._loggedUser$.next(user)
    localStorage.setItem(this._tokenName, resp.idToken)
  }

  logout() {
    this._loggedUser$.next(undefined)
    localStorage.removeItem(this._tokenName)
  }

  signUp(user: IUser) {
    return this._http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, user,).pipe(
      tap((resp) => {
        this.accessUser(resp)
      })
    )
  }

  login(user: IUser) {
    return this._http.post<IAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, user).pipe(
      tap((resp) => {
        this.accessUser(resp)
      })
    )
  }

  retrieveUsetData(){
    return this._http.post<IRetrieveUserResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.API_KEY}`, {
      "idToken": localStorage.getItem(this._tokenName)
    })
  }
}