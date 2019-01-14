import { MyProfileComponent } from './my-profile/my-profile.component';
import { BadgesComponent } from './badges/badges.component';
import { RouteComponent } from './route/route.component';
import { Routes } from '@angular/router';
import { PoiComponent } from './poi/poi.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { CategoriesComponent } from './categories/categories.component';
import { PoiDetailsComponent } from './poi-details/poi-details.component';

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
      { path: 'myprofile', component: MyProfileComponent}
    ]
  }
];
