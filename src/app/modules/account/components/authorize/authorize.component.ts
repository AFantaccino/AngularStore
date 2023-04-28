import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {

  constructor(private _account: AccountService, private _activatedRoute: ActivatedRoute) {
  }

  public user: IUser = {
    email: '',
    password: '',
    returnSecureToken: true
  }

  public alreadyAnAccount: boolean = false;

  ngOnInit(): void {
    this._activatedRoute.url.subscribe(resp => {
      if (resp[0].path === 'login') {
        this.alreadyAnAccount = true;
      }
    })
  }

  submit(f: NgForm) {
    if (this.alreadyAnAccount) {
      this._account.login(this.user).subscribe({
        error: (err) => {
          if (err.error.error.message === "EMAIL_NOT_FOUND")
            f.form.controls['email'].setErrors({ 'userNotFound': true })

          else if (err.error.error.message === "INVALID_PASSWORD")
            f.form.controls['password'].setErrors({ 'wrongPassword': true })

          else console.log(err)
        }
      })
    } else {
      this._account.signUp(this.user).subscribe({
        error: (err) => {
          if (err.error.error.message === "EMAIL_EXISTS")
            f.form.controls['email'].setErrors({ 'emailAlreadyUsed': true })

          else console.log(err)
        }
      })
    }
  }
}