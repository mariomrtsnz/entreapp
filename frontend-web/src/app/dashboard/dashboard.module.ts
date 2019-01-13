import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './../material-module';
import { BadgesComponent } from './badges/badges.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardRoutes } from './dashboard.routing';
import { LikesComponent } from './likes/likes.component';
import { MenuComponent } from './menu/menu.component';
import { PoiDetailsComponent } from './poi-details/poi-details.component';
import { PoiComponent } from './poi/poi.component';
import { RouteComponent } from './route/route.component';
import { SuperCategoriesComponent } from './supercategories/supercategories.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashboardRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvjSoqqucab1Bs_Oedq3gSAXVhIU5BFHw'
    })
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [PoiComponent, MenuComponent, UserComponent, CategoriesComponent, SuperCategoriesComponent, RouteComponent, LikesComponent, BadgesComponent, PoiDetailsComponent],
})

export class DashboardModule { }
