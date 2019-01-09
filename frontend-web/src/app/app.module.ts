import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routes } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { DialogEditCategoryComponent } from './dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogNewCategoryComponent } from './dialogs/dialog-new-category/dialog-new-category.component';
import { DialogDeleteCategoryComponent } from './dialogs/dialog-delete-category/dialog-delete-category.component';
import { DialogNewSupercategoryComponent } from './dialogs/dialog-new-supercategory/dialog-new-supercategory.component';
import { DialogEditSupercategoryComponent } from './dialogs/dialog-edit-supercategory/dialog-edit-supercategory.component';
import { DialogDeleteSuperCategoryComponent } from './dialogs/dialog-delete-supercategory/dialog-delete-supercategory.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {
  MatSidenavModule,
  MatCardModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DialogNewCategoryComponent,
    DialogNewSupercategoryComponent,
    DialogEditCategoryComponent,
    DialogEditSupercategoryComponent,
    DialogDeleteCategoryComponent,
    DialogDeleteSuperCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    DialogNewCategoryComponent,
    DialogNewSupercategoryComponent,
    DialogEditCategoryComponent,
    DialogEditSupercategoryComponent,
    DialogDeleteCategoryComponent,
    DialogDeleteSuperCategoryComponent

  ],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
