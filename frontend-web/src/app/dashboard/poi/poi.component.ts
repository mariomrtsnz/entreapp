import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogPoiDeleteComponent } from 'src/app/dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { DialogTranslatePoiComponent } from 'src/app/dialogs/dialog-translate-poi/dialog-translate-poi.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PoiService } from 'src/app/services/poi.service';

import { PoiResponse } from './../../interfaces/poi-response';

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

  /** Get the list of all POIs from API */
  getAll() {
    this.poiService.getAll().subscribe(receivedPois => this.POIs = receivedPois,
      err => this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 }));
  }

  /** Go to PoiCreate view */
  openNewPoi() {
    this.router.navigate(['home/create']);
  }

  /** Go to PoiEdit view */
  openEditPoi(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/edit']);
  }

  /** Open a new modal to confirm the deletion of a POI */
  openDialogDeletePoi(p: PoiResponse) {
    const dialogDeletePoi = this.dialog.open(DialogPoiDeleteComponent, { data: { poi: p } });
    dialogDeletePoi.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
      err => this.snackBar.open('There was an error when we were deleting this POI.', 'Close', { duration: 3000 }));
  }

  /** Open a modal to insert a new translation */
  openDialogTranslatePoi(p) {
    const dialogTranslatePoi = this.dialog.open(DialogTranslatePoiComponent, { data: { poi: p } });
    dialogTranslatePoi.afterClosed().subscribe(res => this.getAll());
  }

  /** Go to POIDetails view */
  goPoiDetails(p) {
    this.poiService.selectedPoi = p;
    this.router.navigate(['home/details']);
  }

}
