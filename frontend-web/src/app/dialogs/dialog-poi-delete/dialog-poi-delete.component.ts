import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiService } from 'src/app/services/poi.service';

@Component({
  selector: 'app-dialog-poi-delete',
  templateUrl: './dialog-poi-delete.component.html',
  styleUrls: ['./dialog-poi-delete.component.scss']
})
export class DialogPoiDeleteComponent implements OnInit {

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private poiService: PoiService, public dialogRef: MatDialogRef<DialogPoiDeleteComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ( {
      borrar: [null , Validators.compose ( [ Validators.required, Validators.pattern(/ELIMINAR$/) ] )]
    });
  }

  onSubmit()  {
    this.poiService.remove(this.data.poi.id).subscribe(() => this.dialogRef.close('confirm'),
    err => this.snackBar.open('Error al borrar la localización.', 'Cerrar', {duration: 3000}));
  }

}
