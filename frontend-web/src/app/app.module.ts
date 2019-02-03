import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {angularResponsive} from 'angular-responsive';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { QuillModule } from 'ngx-quill';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogBadgeComponent } from './dialogs/dialog-badge/dialog-badge.component';
import { DialogCreateUserComponent } from './dialogs/dialog-create-user/dialog-create-user.component';
import { DialogDeleteBadgeComponent } from './dialogs/dialog-delete-badge/dialog-delete-badge.component';
import { DialogDeleteCategoryComponent } from './dialogs/dialog-delete-category/dialog-delete-category.component';
import { DialogDeleteRouteComponent } from './dialogs/dialog-delete-route/dialog-delete-route.component';
import { DialogDeleteUserComponent } from './dialogs/dialog-delete-user/dialog-delete-user.component';
import { DialogEditCategoryComponent } from './dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogEditUserComponent } from './dialogs/dialog-edit-user/dialog-edit-user.component';
import { DialogCreateCategoryComponent } from './dialogs/dialog-create-category/dialog-create-category.component';
import { DialogPoiDeleteComponent } from './dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { DialogRouteComponent } from './dialogs/dialog-route/dialog-route.component';
import { DialogUpdateProfileComponent } from './dialogs/dialog-update-profile/dialog-update-profile.component';
import { MaterialModule } from './material-module';

import { DialogTranslatePoiComponent } from './dialogs/dialog-translate-poi/dialog-translate-poi.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogPoiDeleteComponent,
    DialogCreateCategoryComponent,
    DialogEditCategoryComponent,
    DialogDeleteCategoryComponent,
    DialogUpdateProfileComponent,
    DialogDeleteUserComponent,
    DialogCreateUserComponent,
    DialogEditUserComponent,
    DialogBadgeComponent,
    DialogDeleteBadgeComponent,
    DialogRouteComponent,
    DialogDeleteRouteComponent,
    DialogTranslatePoiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-JcBiiDwRaudqbUlqAC4c-Ehn4uPCsqY'
    }),
    QuillModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC9iLIAKYPgmNojVVXXHCP1nRt_lAMkxOQ',
      authDomain: 'entreapp-erasmus.firebaseapp.com',
      storageBucket: 'entreapp-erasmus.appspot.com'
    }),
    AngularFireStorageModule,
    GooglePlaceModule,
    AngularFireAuthModule,
  ],
  entryComponents: [
    DialogCreateCategoryComponent,
    DialogEditCategoryComponent,
    DialogDeleteCategoryComponent,
    DialogDeleteUserComponent,
    DialogCreateUserComponent,
    DialogEditUserComponent,
    DialogPoiDeleteComponent,
    DialogBadgeComponent,
    DialogDeleteBadgeComponent,
    DialogRouteComponent,
    DialogDeleteRouteComponent,
    DialogUpdateProfileComponent,
    DialogTranslatePoiComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
