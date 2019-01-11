import { LikesComponent } from './likes/likes.component';
import { BadgesComponent } from './badges/badges.component';
import { RouteComponent } from './route/route.component';
import { Routes } from '@angular/router';
import { PoiComponent } from './poi/poi.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { SuperCategoriesComponent } from './supercategories/supercategories.component';
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
      { path: 'likes', component: LikesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'supercategories', component: SuperCategoriesComponent },
      { path: 'details', component: PoiDetailsComponent }
    ]
  }
];
