import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { PoiService } from 'src/app/services/poi.service';
import { PoiResponse } from './../../interfaces/poi-response';
import { DialogPoiCreateComponent } from 'src/app/dialogs/dialog-poi-create/poi-create.component';
import { DialogPoiEditComponent } from 'src/app/dialogs/dialog-poi-edit/poi-edit.component';
import { DialogPoiDeleteComponent } from 'src/app/dialogs/dialog-poi-delete/poi-delete.component';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit {

  POIs: PoiResponse;


  constructor(private poiService: PoiService, public dialog: MatDialog,
    private authService: AuthenticationService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.poiService.getAll().toPromise()
    .then(receivedPois => {
      this.POIs = receivedPois;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }

  openDialogNewPoi() {
    const dialogNewPoi = this.dialog.open(DialogPoiCreateComponent, {width: '500px'});
    dialogNewPoi.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('There was an error when we were creating a new POI.', 'Close', {duration: 3000}));
  }

  openDialogEditPoi(p: PoiResponse) {
    const dialogEditPoi = this.dialog.open(DialogPoiEditComponent, {data: {poi: p}, width: '500px' });
    dialogEditPoi.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('There was an error when we were updating this POI.', 'Close', {duration: 3000}));
  }

  openDialogDeletePoi(p: PoiResponse) {
    const dialogDeletePoi = this.dialog.open(DialogPoiDeleteComponent, {data: {poi: p}});
    dialogDeletePoi.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('There was an error when we were deleting this POI.', 'Close', {duration: 3000}));
  }

  goPoiDetails(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/details']);
  }

}
