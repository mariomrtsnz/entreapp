import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { UserUpdateDto } from 'src/app/dto/update-user.dto';
import { CountryResponse } from 'src/app/interfaces/country-response';

import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user.service';

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
  }

  createForm() {
    this.form = this.fb.group({
      role: [this.data.user.role, Validators.compose([Validators.required])]
    });
  }

  getAllCountries() {
    this.userService.getAllCountries().subscribe(receivedCountries => {
      this.countries = receivedCountries;
    }, error => {
      this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 });
    });
  }

  /*onSubmit() {
      const updatedUser: UserUpdateDto = new UserUpdateDto(this.form.value.role);
      console.log(updatedUser);
      this.userService.edit(this.data.user.id, updatedUser).subscribe(result => {
        console.log('success');
        console.log(result);
      }, error => {
        console.log(error);
        this.snackBar.open('Failed to update user.', 'Close', { duration: 3000 });
      });
  }*/
  onSubmit() {
    const editedUser: UserUpdateDto = <UserUpdateDto>this.form.value;
    this.userService.edit(this.data.user.id, editedUser).subscribe(result => {
      this.dialogRef.close(result);
    }, error => {
      this.snackBar.open('Failed to update user.', 'Close', {
        duration: 3000
      });
    });
  }
  obtainRoles() {
    this.userService.getRoles().subscribe(receivedRoles => {
      this.roles = receivedRoles.roles;
    }, error => {
      this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 });
    });
  }

}
