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
import { SuperCategoriesComponent } from './supercategories/supercategories.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouteComponent } from './route/route.component';
import { LikesComponent } from './likes/likes.component';
import { BadgesComponent } from './badges/badges.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ PoiComponent, MenuComponent, UserComponent, CategoriesComponent, SuperCategoriesComponent, RouteComponent, LikesComponent, BadgesComponent ],
})

export class DashboardModule {}
