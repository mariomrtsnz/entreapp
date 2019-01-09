import { MaterialModule } from './../material-module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routing';
import { PoiComponent } from './poi/poi.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListSuperCategoriesComponent } from './list-supercategories/list-supercategories.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ PoiComponent, MenuComponent, UserComponent, ListCategoriesComponent, ListSuperCategoriesComponent ],
})

export class DashboardModule {}
