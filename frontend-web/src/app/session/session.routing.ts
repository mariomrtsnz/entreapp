import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', component: SigninComponent},
  { path: 'signin', component: SigninComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'forgot', component: ForgotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
