import { Component, OnInit } from '@angular/core';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { Router } from '@angular/router';
import { DialogPoiDeleteComponent } from 'src/app/dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent implements OnInit {

  poi: OnePoiResponse;
  coverImage: string;
  images = ['https://bit.ly/2AHGQIw', 'https://bit.ly/2QCBEuO', 'https://on.natgeo.com/2TOioMO'];
  showSettings = false;

  constructor(private poiService: PoiService, public router: Router,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.poiService.selectedPoi == null) {
      this.router.navigate(['home']);
    } else {
      this.getData();
    }
  }

  getData() {
    this.poiService.getOne(this.poiService.selectedPoi.id).subscribe(p => {
      this.poi = p;
      this.coverImage = p.coverImage;
    });
  }

  openEditPoi() {
    this.poiService.selectedPoi = this.poi;
    this.router.navigate(['home/edit']);
  }

  openDialogDeletePoi() {
    const dialogDeletePoi = this.dialog.open(DialogPoiDeleteComponent, {data: {poi: this.poi}});
    dialogDeletePoi.afterClosed().subscribe(res => res === 'confirm' ? this.router.navigate['/home'] : null,
    err => this.snackBar.open('There was an error when we were deleting this POI.', 'Close', {duration: 3000}));
  }


}
