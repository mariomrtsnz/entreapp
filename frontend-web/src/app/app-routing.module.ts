import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

export const routes: Routes = [{
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [{
      path: '',
      loadChildren: './session/session.module#SessionModule'
    }]
  },
  {
    path: '',
    children: [{
      path: 'home',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];
