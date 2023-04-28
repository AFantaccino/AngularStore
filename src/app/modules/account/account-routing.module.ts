import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizeComponent } from './components/authorize/authorize.component';

const routes: Routes = [
  {
    path: 'authenticate',
    children: [
      { path: 'login', component: AuthorizeComponent },
      { path: 'signup', component: AuthorizeComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
