import { Component, OnInit, Inject } from '@angular/core';
import { PoiResponse } from 'src/app/interfaces/poi-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PoiService } from 'src/app/services/poi.service';
import { PoiCreateDto } from './../../dto/poi-create-dto';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.scss']
})
export class PoiEditComponent implements OnInit {

  POI: PoiResponse;
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private poiService: PoiService, public dialogRef: MatDialogRef<PoiEditComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    // this.getData();
  }

  createForm() {
    this.form = this.fb.group ( {
      name: [this.POI.name, Validators.compose ([ Validators.required ])],
      categories: [this.POI.categories, Validators.compose ([ Validators.required ])],
      coordinates: [this.POI.coordinates, Validators.compose ([ Validators.required ])],
      // badges
      audioguides: [this.POI.audioguides, Validators.compose ([ Validators.required ])],
      description: [this.POI.description, Validators.compose ([ Validators.required ])],
      images: [this.POI.images, Validators.compose ([ Validators.required ])],
      year: [this.POI.year, Validators.compose ([ Validators.required ])],
      creator: [ this.POI.creator ],
      likes: [this.POI.likes, Validators.compose ([ Validators.required ])],
      status: [this.POI.status, Validators.compose ([ Validators.required ])],
      // schedule: [this.POI., Validators.compose ([ Validators.required ])],
      price: [ this.POI.price ],
    } );
  }

  onSubmit() {
    const poiEdited: PoiCreateDto = <PoiCreateDto>this.form.value;
    this.poiService.edit(this.POI.id, poiEdited).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al editar localización.', 'Cerrar', {duration: 3000}));
  }

}
