import { Routes } from '@angular/router';
import { PoiComponent } from './poi/poi.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { SuperCategoriesComponent } from './supercategories/supercategories.component';
import { CategoriesComponent } from './categories/categories.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: PoiComponent },
      { path: 'users', component: UserComponent }
      /*{ path: 'routes', component: RoutesComponent },
      { path: 'badges', component: BadgesComponent },
      { path: 'likes', component: LikesComponent },*/,
      { path: 'categories', component: CategoriesComponent },
      { path: 'supercategories', component: SuperCategoriesComponent }
    ]
  }
];
