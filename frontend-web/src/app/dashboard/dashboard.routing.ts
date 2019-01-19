import { RouteDetailsComponent } from './route-details/route-details.component';
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

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: PoiComponent },
      { path: 'users', component: UserComponent },
      { path: 'routes', component: RouteComponent },
      { path: 'badges', component: BadgesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details', component: PoiDetailsComponent },
      { path: 'myprofile', component: MyProfileComponent },
      { path: 'edit', component: PoiEditComponent },
      { path: 'create', component: PoiCreateComponent },
      { path: 'route/details', component: RouteDetailsComponent}
    ]
  }
];
