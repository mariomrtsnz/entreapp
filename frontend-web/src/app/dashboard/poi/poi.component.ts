import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PoiService } from 'src/app/services/poi.service';
import { PoiResponse } from './../../interfaces/poi-response';
import { PoiCreateComponent } from 'src/app/dialogs/poi-create/poi-create.component';
import { PoiDeleteComponent } from 'src/app/dialogs/poi-delete/poi-delete.component';
import { PoiEditComponent } from 'src/app/dialogs/poi-edit/poi-edit.component';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit {

  POIs: PoiResponse[];


  constructor(private poiService: PoiService, public dialog: MatDialog,
    private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.poiService.getAll().toPromise()
    .then(receivedPois => this.POIs = receivedPois)
    .catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));
  }

  openDialogNewPoi() {
    const dialogNewPoi = this.dialog.open(PoiCreateComponent, {width: '500px'});
    dialogNewPoi.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar los datos.', 'Cerrar', {duration: 3000}));
  }

  openDialogEditPoi(p: PoiResponse) {
    const dialogEditPoi = this.dialog.open(PoiEditComponent, {data: {poi: p}, width: '500px' });
    dialogEditPoi.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar los datos.', 'Cerrar', {duration: 3000}));
  }

  openDialogDeletePoi(p: PoiResponse) {
    const dialogDeletePoi = this.dialog.open(PoiDeleteComponent, {data: {poi: p}});
    dialogDeletePoi.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar los datos.', 'Cerrar', {duration: 3000}));
  }

}