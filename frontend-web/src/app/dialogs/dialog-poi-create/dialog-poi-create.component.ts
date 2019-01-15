import { Component, OnInit, Inject } from '@angular/core';
import { PoiResponse } from '../../interfaces/poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';

@Component({
  selector: 'app-dialog-poi-create',
  templateUrl: './dialog-poi-create.component.html',
  styleUrls: ['./dialog-poi-create.component.scss']
})
export class DialogPoiCreateComponent implements OnInit {

  POI: PoiResponse;
  public coordinatesForm: FormGroup;
  public form: FormGroup;

  constructor(private fb: FormBuilder, private poiService: PoiService,
    public dialogRef: MatDialogRef<DialogPoiCreateComponent>, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    // this.getData();
  }

  createForm() {
    this.coordinatesForm = this.fb.group ({
      lat: [null, Validators.compose ([ Validators.required ])],
      lng: [null, Validators.compose ([ Validators.required ])]
    });
    this.form = this.fb.group ( {
      name: [null, Validators.compose ([ Validators.required ])],
      year: [null, Validators.compose ([ Validators.required ])],
      creator: [ null ],
      description: [null, Validators.compose ([ Validators.required ])],
      images: [null, Validators.compose ([ Validators.required ])],
      // categories: [null, Validators.compose ([ Validators.required ])],
      audioguides: [null, Validators.compose ([ Validators.required ])],
      status: [null, Validators.compose ([ Validators.required ])],
      schedule: [null, Validators.compose ([ Validators.required ])],
      price: [ null ],
    } );
  }

  onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    newPoi.coordinates = this.coordinatesForm.value;
    this.poiService.create(newPoi).subscribe(() => this.dialogRef.close('confirm'),
    err => this.snackBar.open('Error al crear localización.', 'Cerrar', {duration: 3000}));
  }

}
