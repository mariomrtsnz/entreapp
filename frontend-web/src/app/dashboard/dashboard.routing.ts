import { Routes } from '@angular/router';

import { BadgesComponent } from './badges/badges.component';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PoiCreateComponent } from './poi-create/poi-create.component';
import { PoiDetailsComponent } from './poi-details/poi-details.component';
import { PoiEditComponent } from './poi-edit/poi-edit.component';
import { PoiComponent } from './poi/poi.component';
import { RouteComponent } from './route/route.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../guards/auth-guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: PoiComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'routes', component: RouteComponent, canActivate: [AuthGuard] },
      { path: 'badges', component: BadgesComponent, canActivate: [AuthGuard] },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
      { path: 'details', component: PoiDetailsComponent, canActivate: [AuthGuard] },
      { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
      { path: 'edit', component: PoiEditComponent, canActivate: [AuthGuard] },
      { path: 'create', component: PoiCreateComponent, canActivate: [AuthGuard] }
    ]
  }
];
