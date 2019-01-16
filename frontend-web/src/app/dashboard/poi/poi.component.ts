import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DialogPoiCreateComponent } from 'src/app/dialogs/dialog-poi-create/dialog-poi-create.component';
import { DialogPoiDeleteComponent } from 'src/app/dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { DialogPoiEditComponent } from 'src/app/dialogs/dialog-poi-edit/dialog-poi-edit.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PoiService } from 'src/app/services/poi.service';

import { PoiResponse } from './../../interfaces/poi-response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit {

  POIs: PoiResponse;


  constructor(private poiService: PoiService, public dialog: MatDialog, private userService: UserService,
    private authService: AuthenticationService, public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAll();
    this.userService.getMe().subscribe(u => console.log(u));
  }

  getAll() {
    this.poiService.getAll().subscribe(receivedPois => this.POIs = receivedPois,
      err => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }

  // openNewPoi() {

  // }

  openDialogNewPoi() {
    const dialogNewPoi = this.dialog.open(DialogPoiCreateComponent, {width: '500px'});
    dialogNewPoi.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were creating a new POI.', 'Close', {duration: 3000}));
  }

  openDialogEditPoi(p: PoiResponse) {
    const dialogEditPoi = this.dialog.open(DialogPoiEditComponent, {data: {poi: p}, width: '500px' });
    dialogEditPoi.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were updating this POI.', 'Close', {duration: 3000}));
  }

  openDialogDeletePoi(p: PoiResponse) {
    const dialogDeletePoi = this.dialog.open(DialogPoiDeleteComponent, {data: {poi: p}});
    dialogDeletePoi.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were deleting this POI.', 'Close', {duration: 3000}));
  }

  goPoiDetails(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/details']);
  }

}
