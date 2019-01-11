import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routes } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { PoiCreateComponent } from './dialogs/poi-create/poi-create.component';
import { PoiDeleteComponent } from './dialogs/poi-delete/poi-delete.component';
import { PoiEditComponent } from './dialogs/poi-edit/poi-edit.component';
import { DialogEditCategoryComponent } from './dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogNewCategoryComponent } from './dialogs/dialog-new-category/dialog-new-category.component';
import { DialogDeleteCategoryComponent } from './dialogs/dialog-delete-category/dialog-delete-category.component';
import { DialogNewSupercategoryComponent } from './dialogs/dialog-new-supercategory/dialog-new-supercategory.component';
import { DialogEditSupercategoryComponent } from './dialogs/dialog-edit-supercategory/dialog-edit-supercategory.component';
import { DialogDeleteSuperCategoryComponent } from './dialogs/dialog-delete-supercategory/dialog-delete-supercategory.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { DialogUpdateProfileComponent } from './dialogs/dialog-update-profile/dialog-update-profile.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
// Configs
export function getAuthServiceConfigs() {
  // tslint:disable-next-line:prefer-const
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('Your-Google-Client-Id')
        }
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    PoiCreateComponent,
    PoiDeleteComponent,
    PoiEditComponent,
    DialogNewCategoryComponent,
    DialogNewSupercategoryComponent,
    DialogEditCategoryComponent,
    DialogEditSupercategoryComponent,
    DialogDeleteCategoryComponent,
    DialogDeleteSuperCategoryComponent,
    DialogUpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SocialLoginModule
  ],
  entryComponents: [
    DialogNewCategoryComponent,
    DialogNewSupercategoryComponent,
    DialogEditCategoryComponent,
    DialogEditSupercategoryComponent,
    DialogDeleteCategoryComponent,
    DialogDeleteSuperCategoryComponent,
    PoiCreateComponent,
    PoiDeleteComponent,
    PoiEditComponent,
  ],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},    {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
