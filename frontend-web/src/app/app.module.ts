import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { PoiComponent } from './dashboard/poi/poi.component';
import { PoiCreateComponent } from './dialogs/poi-create/poi-create.component';
import { PoiDeleteComponent } from './dialogs/poi-delete/poi-delete.component';
import { PoiEditComponent } from './dialogs/poi-edit/poi-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PoiComponent,
    PoiCreateComponent,
    PoiDeleteComponent,
    PoiEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
