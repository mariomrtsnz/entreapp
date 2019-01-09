import { Component, OnInit, Inject } from '@angular/core';
import { PoiResponse } from './../../interfaces/poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';

@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.scss']
})
export class PoiCreateComponent implements OnInit {

  POI: PoiResponse;
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private poiService: PoiService, public dialogRef: MatDialogRef<PoiCreateComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    // this.getData();
  }

  createForm() {
    this.form = this.fb.group ( {
      name: [null, Validators.compose ([ Validators.required ])],
      categories: [null, Validators.compose ([ Validators.required ])],
      coordinates: [null, Validators.compose ([ Validators.required ])],
      // badges
      audioguides: [null, Validators.compose ([ Validators.required ])],
      description: [null, Validators.compose ([ Validators.required ])],
      images: [null, Validators.compose ([ Validators.required ])],
      year: [null, Validators.compose ([ Validators.required ])],
      creator: [ null ],
      likes: [null, Validators.compose ([ Validators.required ])],
      status: [null, Validators.compose ([ Validators.required ])],
      schedule: [null, Validators.compose ([ Validators.required ])],
      price: [ null ],
    } );
  }

  onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    this.poiService.create(newPoi).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al crear localización.', 'Cerrar', {duration: 3000}));
  }

}
