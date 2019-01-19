import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

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
    canActivate: [AuthGuard],
    children: [{
      path: 'home',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
