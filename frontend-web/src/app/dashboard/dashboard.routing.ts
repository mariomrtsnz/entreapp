import { ListSuperCategoriesComponent } from './../home/list-supercategories/list-supercategories.component';
import { ListCategoriesComponent } from './../home/list-categories/list-categories.component';
import { Routes } from '@angular/router';
import { PoiComponent } from './poi/poi.component';
import { MenuComponent } from './menu/menu.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: PoiComponent }
      /*{ path: 'users', component: ListUsersComponent },
      { path: 'routes', component: ListRoutesComponent },
      { path: 'badges', component: ListBadgesComponent },
      { path: 'likes', component: ListLikesComponent },
      { path: 'categories', component: ListCategoriesComponent },
      { path: 'supercategories', component: ListSuperCategoriesComponent }*/
    ]
  }
];
