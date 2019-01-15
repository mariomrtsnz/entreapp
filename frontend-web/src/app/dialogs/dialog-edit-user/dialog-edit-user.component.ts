import { Component, OnInit, Inject } from '@angular/core';
import { UserResponse } from '../../interfaces/user-response';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { UserCreateDto } from 'src/app/dto/create-user.dto';
import { Roles } from 'src/app/interfaces/roles';
import { CountryResponse } from 'src/app/interfaces/country-response';
import { CustomValidators } from 'ng2-validation';
import { UserUpdateDto } from 'src/app/dto/update-user.dto';
import { User } from '../../../../../api/src/api/user/index';

const password = new FormControl('');
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  countries: CountryResponse[];
  USER: UserResponse;
  roleSelected;
  public form: FormGroup;
  userId: string;
  roles: string[];
  constructor(private fb: FormBuilder, private userService: UserService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>, public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.userId = this.data.user.id;
    this.createForm();
    this.obtainRoles();
    this.getAllCountries();
    console.log(this.data);
  }

  createForm() {
    this.form = this.fb.group({
      role: [this.data.user.role, Validators.compose([Validators.required])]
    });
  }

  getAllCountries() {
    this.userService.getAllCountries().toPromise()
      .then(receivedCountries => {
        this.countries = receivedCountries;
      })
      .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 }));
  }
  /*onSubmit() {
    const newUser: UserCreateDto = <UserCreateDto>this.form.value;
    newUser.picture = 'https://gravatar.com/avatar/801fce29ee6b494ec10dc47af131b1ba?d=identicon';
    console.log(newUser);
    this.userService.create(newUser).toPromise()
      .then(resp => {
        console.log('aqui');
        console.log(resp);
        this.dialogRef.close(resp);
      })
      .catch(() => this.snackBar.open('Error creating user.', 'Cerrar', { duration: 3000 }));
  }*/
  onSubmit() {
      const updatedUser: UserUpdateDto = <UserUpdateDto>this.form.value;
      this.userService.edit(this.data.User.id, updatedUser).subscribe(result => {
        this.dialogRef.close('confirm');
      }, error => {
        console.log(error);
        this.snackBar.open('Failed to update user.', 'Close', { duration: 3000 });
      });
  }
  obtainRoles() {
    this.userService.getRoles().toPromise()
      .then(receivedRoles => {
        this.roles = receivedRoles.roles;
      })
      .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 }));
  }

}
