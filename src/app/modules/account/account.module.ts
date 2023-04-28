import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthorizeComponent } from './components/authorize/authorize.component';

@NgModule({
  declarations: [
    AuthorizeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AccountRoutingModule,
    ],
  exports: [
    AuthorizeComponent
  ]
})
export class AccountModule { }
