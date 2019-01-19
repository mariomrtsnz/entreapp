import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../interfaces/user-response';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserUpdateMyProfileDto } from 'src/app/dto/user-update-my-profile.dto';
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
    this.user = this.data.user;
    this.obtainRoles();
  }
  createForm() {
    this.form = this.fb.group({
      role: [this.data.user.role, Validators.compose([Validators.required])]
    });
  }

  updateProfile() {
    this.user.password = this.password;
    this.userService.editMyProfile(this.user, this.user.id.toString()).subscribe(result => {
      console.log('success');
      console.log(result);
    }, error => {
      console.log(error);
      console.log(this.user.password);
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
