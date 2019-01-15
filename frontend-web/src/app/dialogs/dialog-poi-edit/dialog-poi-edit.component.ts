import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PoiService } from 'src/app/services/poi.service';

import { PoiCreateDto } from '../../dto/poi-create-dto';
import { OnePoiResponse } from '../../interfaces/one-poi-response';

@Component({
  selector: 'app-dialog-poi-edit',
  templateUrl: './dialog-poi-edit.component.html',
  styleUrls: ['./dialog-poi-edit.component.scss']
})
export class DialogPoiEditComponent implements OnInit {

  poi: OnePoiResponse;
  public coordinatesForm: FormGroup;
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private poiService: PoiService, public dialogRef: MatDialogRef<DialogPoiEditComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.poiService.getOne(this.data.poi.id).toPromise()
    .then(p => this.poi = p)
    .then(() => console.log(this.poi))
    .then(() => this.createForm());
  }

  createForm() {
    this.coordinatesForm = this.fb.group ({
      lat: [this.poi.coordinates.lat, Validators.compose ([ Validators.required ])],
      lng: [this.poi.coordinates.lng, Validators.compose ([ Validators.required ])]
    })
    this.form = this.fb.group ( {
      name: [this.poi.name, Validators.compose ([ Validators.required ])],
      // categories: [this.poi.categories, Validators.compose ([ Validators.required ])],
      audioguides: [this.poi.audioguides, Validators.compose ([ Validators.required ])],
      description: [this.poi.description, Validators.compose ([ Validators.required ])],
      coverImage: [this.poi.coverImage, Validators.compose ([ Validators.required ])],
      images: [this.poi.images, Validators.compose ([ Validators.required ])],
      year: [this.poi.year, Validators.compose ([ Validators.required ])],
      creator: [ this.poi.creator ],
      status: [this.poi.status, Validators.compose ([ Validators.required ])],
      schedule: [this.poi.schedule, Validators.compose ([ Validators.required ])],
      price: [ this.poi.price ],
    } );
  }

  onSubmit() {
    const poiEdited: PoiCreateDto = <PoiCreateDto>this.form.value;
    poiEdited.coordinates = this.coordinatesForm.value;
    this.poiService.edit(this.poi.id, poiEdited).subscribe(() => this.dialogRef.close('confirm'),
    err => this.snackBar.open('Error al editar localización.', 'Cerrar', {duration: 3000}));
  }

}
