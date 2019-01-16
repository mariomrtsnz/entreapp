import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  allPois: OnePoiResponse[];
  badgeId: string;
  form: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private poisService: PoiService, private badgeService: BadgeService, public dialogRef: MatDialogRef<DialogBadgeComponent>) { }

  ngOnInit() {
    this.getAllPois();
    this.createForm();
    if (this.data.badge) {
      this.edit = true;
      this.badgeId = this.data.badge.id;
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.edit) {
      const editedBadge: BadgeDto = <BadgeDto>this.form.value;
      this.badgeService.edit(this.badgeId, editedBadge).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => {
        console.log(error);
        this.snackBar.open('Failed to edit.', 'Close', {duration: 3000});
      });
    } else {
      const newBadge: BadgeDto = <BadgeDto>this.form.value;
      this.badgeService.create(newBadge).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => {
        console.log(error);
        this.snackBar.open('Failed to create.', 'Close', {duration: 3000});
      });
    }
  }

  createForm() {
    if (this.data.badge) {
      const editForm: FormGroup = this.fb.group ({
        name: [this.data.badge.name, Validators.compose ([ Validators.required ])],
        points: [this.data.badge.points, Validators.compose ([ Validators.required ])],
        description: [this.data.badge.description, Validators.compose ([ Validators.required ])],
        icon: [this.data.badge.icon, Validators.compose ([ Validators.required ])],
        pois: [this.data.badge.pois, Validators.compose ([ Validators.required ])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group ({
        name: ['', Validators.compose ([ Validators.required ])],
        points: ['', Validators.compose ([ Validators.required ])],
        description: ['', Validators.compose ([ Validators.required ])],
        icon: ['', Validators.compose ([ Validators.required ])],
        pois: ['', Validators.compose ([ Validators.required ])]
      });
      this.form = newForm;
    }
  }

  getAllPois() {
    this.poisService.getAll().subscribe(
      pois => {
          this.allPois = pois.rows;
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

  editBadge() {
    const poisIds: string[] = [];
    this.pois.forEach(poi => {
      poisIds.push(poi.id);
    });
    const badgeCreateDto = new BadgeDto(this.name, this.points, this.description, this.icon, poisIds);
    this.badgeService.edit(this.badgeId, badgeCreateDto).subscribe(
      badge => {
        this.dialogRef.close('confirm');
      }
    );
  }


}
