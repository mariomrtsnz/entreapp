import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DialogPoiDeleteComponent } from 'src/app/dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { PoiService } from 'src/app/services/poi.service';

import { PoiResponse } from './../../interfaces/poi-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogTranslatePoiComponent } from 'src/app/dialogs/dialog-translate-poi/dialog-translate-poi.component';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit {

  POIs: PoiResponse;


  constructor(private poiService: PoiService, public dialog: MatDialog,
    public router: Router, public snackBar: MatSnackBar, private titleService: Title, public authService: AuthenticationService) { }

  ngOnInit() {
    this.titleService.setTitle('Home - Points of Interests');
    this.getAll();
  }

  getAll() {
    this.poiService.getAll().subscribe(receivedPois => this.POIs = receivedPois,
      err => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }

  openNewPoi() {
    this.router.navigate(['home/create']);
  }

  openEditPoi(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/edit']);
  }

  openDialogDeletePoi(p: PoiResponse) {
    const dialogDeletePoi = this.dialog.open(DialogPoiDeleteComponent, {data: {poi: p}});
    dialogDeletePoi.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were deleting this POI.', 'Close', {duration: 3000}));
  }
  openDialogTranslatePoi(p: PoiResponse) {
    const dialogTranslatePoi = this.dialog.open(DialogTranslatePoiComponent, {data: {poi: p}});
    dialogTranslatePoi.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were translating this POI.', 'Close', {duration: 3000}));
  }

  goPoiDetails(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/details']);
  }

}
