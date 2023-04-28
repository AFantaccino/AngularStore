import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthorizeComponent } from './components/authorize/authorize.component';

export function tokenGetter() {
  return localStorage.getItem("accessToken");
}

@NgModule({
  declarations: [
    AuthorizeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AccountRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"]
      }
    }),
  ],
  exports: [
    AuthorizeComponent
  ]
})
export class AccountModule { }
