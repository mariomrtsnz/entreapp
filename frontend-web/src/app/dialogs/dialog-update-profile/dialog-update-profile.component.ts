import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';

import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user.service';

const password = new FormControl('');
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-dialog-update-profile',
  templateUrl: './dialog-update-profile.component.html',
  styleUrls: ['./dialog-update-profile.component.scss']
})

export class DialogUpdateProfileComponent implements OnInit {
  user: UserResponse;
  id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  language: string;
  roleSelected;
  public form: FormGroup;
  roles: string[];
  constructor(private fb: FormBuilder, private userService: UserService,
    public dialogRef: MatDialogRef<DialogUpdateProfileComponent>, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //it obtains roles and the user to update it
    this.user = this.data.user;
    this.obtainRoles();
  }
  createForm() {
    this.form = this.fb.group({
      role: [this.data.user.role, Validators.compose([Validators.required])]
    });
  }

  //it let you update your profile
  updateProfile() {
    this.user.password = this.password;
    this.userService.editMyProfile(this.user, this.user.id.toString())
      .subscribe(r => this.snackBar.open('User updated successfully.', 'Close', { duration: 3000 }),
        e => this.snackBar.open('Failed to update user.', 'Close', { duration: 3000 }));
  }

  //it obtains every role from api
  obtainRoles() {
    this.userService.getRoles().subscribe(receivedRoles => {
      this.roles = receivedRoles.roles;
    }, e => {
      this.snackBar.open('There was an error when we were loading data.', 'Close', {
        duration: 3000
      });
    });
  }
}
