import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BadgeService } from './../../services/badge.service';
import { BadgeDto } from './../../dto/badge.dto';
import { PoiService } from './../../services/poi.service';
import { Component, OnInit, Inject } from '@angular/core';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';

@Component({
  selector: 'app-dialog-badge',
  templateUrl: './dialog-badge.component.html',
  styleUrls: ['./dialog-badge.component.scss']
})
export class DialogBadgeComponent implements OnInit {
  edit: boolean;
  name: string;
  points: number;
  description: string;
  icon: string;
  pois: OnePoiResponse[];
  badgeId: string;

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private poisService: PoiService, private badgeService: BadgeService, public dialogRef: MatDialogRef<DialogBadgeComponent>) { }

  ngOnInit() {
    this.getAllPois();
    if (this.data !== null) {
      this.edit = true;
      this.name = this.data.badge.name;
      this.points = this.data.badge.points;
      this.description = this.data.badge.description;
      this.icon = this.data.badge.icon;
      this.badgeId = this.data.badge.id;
    } else {
      this.edit = false;
    }
  }

  getAllPois() {
    this.poisService.getAll().subscribe(
      pois => {
          this.pois = pois.rows;
      }, error => {
        console.log(error);
      }
    );
  }



  addBadge() {
    const poisIds: string[] = [];
    this.pois.forEach(poi => {
      poisIds.push(poi.id);
    });
    const badgeCreateDto = new BadgeDto(this.name, this.points, this.description, this.icon, poisIds);
    this.badgeService.create(badgeCreateDto).subscribe(
      badge => {
        this.dialogRef.close('confirm');
      }
    );
  }

  editCategoria() {
    const poisIds: string[] = [];
    this.pois.forEach(poi => {
      poisIds.push(poi.id);
    });
    const badgeCreateDto = new BadgeDto(this.name, this.points, this.description, this.icon, poisIds);
    this.badgeService.edit(this.badgeId, badgeCreateDto).subscribe(
      categoria => {
        this.dialogRef.close('confirm');
      }
    );
  }


}
