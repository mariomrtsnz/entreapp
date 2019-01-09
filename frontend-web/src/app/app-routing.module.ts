import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AdminLayoutComponent, AuthLayoutComponent } from './core';
export const routes: Routes = [{ path: '', redirectTo: '/session/signin', pathMatch: 'full'}];
export const AppRoutes: Routes = [
  // ,
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [{
  //     path: 'dashboard',
  //     loadChildren: './dashboard/dashboard.module#DashboardModule'
  //   }]
  // }, {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [{
  //     path: 'session',
  //     loadChildren: './session/session.module#SessionModule'
  //   }]
  // }, {
  //   path: '**',
  //   redirectTo: 'session/404'
  // }
  ];
