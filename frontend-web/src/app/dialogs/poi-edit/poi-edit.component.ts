import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PoiService } from 'src/app/services/poi.service';

import { PoiCreateDto } from './../../dto/poi-create-dto';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.scss']
})
export class PoiEditComponent implements OnInit {

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private poiService: PoiService, public dialogRef: MatDialogRef<PoiEditComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data.poi);
    this.createForm();
    // this.getData();
  }

  createForm() {
    this.form = this.fb.group ( {
      name: [this.data.poi.name, Validators.compose ([ Validators.required ])],
      categories: [this.data.poi.categories, Validators.compose ([ Validators.required ])],
      coordinates: [this.data.poi.coordinates, Validators.compose ([ Validators.required ])],
      // badges
      audioguides: [this.data.poi.audioguides, Validators.compose ([ Validators.required ])],
      description: [this.data.poi.description, Validators.compose ([ Validators.required ])],
      images: [this.data.poi.images, Validators.compose ([ Validators.required ])],
      year: [this.data.poi.year, Validators.compose ([ Validators.required ])],
      creator: [ this.data.poi.creator ],
      status: [this.data.poi.status, Validators.compose ([ Validators.required ])],
      schedule: [this.data.poi.Schedule, Validators.compose ([ Validators.required ])],
      price: [ this.data.poi.price ],
    } );
  }

  onSubmit() {
    const poiEdited: PoiCreateDto = <PoiCreateDto>this.form.value;
    this.poiService.edit(this.data.poi.id, poiEdited).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al editar localización.', 'Cerrar', {duration: 3000}));
  }

}
