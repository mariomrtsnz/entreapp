import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AdminLayoutComponent, AuthLayoutComponent } from './core';
const routes: Routes = [
  { path: '', redirectTo: '/session/signin', pathMatch: 'full'},
  {
    path: '',
    //component: AdminLayoutComponent,
    children: [{
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }]
  },
{
    path: '',
    // component: AuthLayoutComponent,
    children: [{
      path: 'session',
      loadChildren: './session/session.module#SessionModule'
    }]
  }, {
    path: '**',
    redirectTo: 'session/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
