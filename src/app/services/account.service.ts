import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { IUser } from '../modules/account/interfaces/user';
import { IServerResponse } from '../modules/account/interfaces/serverResponse';
import { ITokenDecode } from '../modules/account/interfaces/tokenDecode';
import { User } from '../modules/account/model/user';

import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../modules/account/account.module';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _loggedUser$ = new BehaviorSubject<User | null>(null)
  public loggedUser$ = this._loggedUser$.asObservable();

  private _tokenName = 'accessToken'

  constructor(private _http: HttpClient, private _jwtService: JwtHelperService) {

    const token = tokenGetter()

    if (token) {
      if (this._jwtService.isTokenExpired(token))
        localStorage.removeItem(this._tokenName)
      else {
        const userData = this._jwtService.decodeToken<ITokenDecode>(token)

        if (userData) {
          const loadedUser = new User(
            userData?.email,
            (userData?.sub)
          )
          this._loggedUser$.next(loadedUser)
        }
      }
    }
  }

  accessUser(resp: IServerResponse) {

    const user = new User(
      resp.email,
      resp.localId,
    )

    this._loggedUser$.next(user)
    localStorage.setItem(this._tokenName, resp.idToken)
  }

  logout() {
    this._loggedUser$.next(null)
    localStorage.removeItem(this._tokenName)
  }

  signUp(user: IUser) {
    return this._http.post<IServerResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfAgixIdqrETN6ziehhuCohnZPvD7bRJ0', user,).pipe(
      tap((resp) => {
        this.accessUser(resp)
      })
    )
  }

  login(user: IUser) {
    return this._http.post<IServerResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfAgixIdqrETN6ziehhuCohnZPvD7bRJ0', user).pipe(
      tap((resp) => {
        this.accessUser(resp)
      })
    )
  }
}