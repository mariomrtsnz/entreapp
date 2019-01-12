import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  private userService: UserService, public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ( {
      borrar: [null , Validators.compose ( [ Validators.required, Validators.pattern(/ELIMINAR$/) ] )]
    });
  }

  onSubmit() {
    this.userService.remove(this.data.user.id).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al borrar el usuario.', 'Cerrar', {duration: 3000}));
  }

}
