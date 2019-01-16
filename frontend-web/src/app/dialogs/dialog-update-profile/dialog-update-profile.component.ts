import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../interfaces/user-response';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dialog-update-profile',
  templateUrl: './dialog-update-profile.component.html',
  styleUrls: ['./dialog-update-profile.component.scss']
})
export class DialogUpdateProfileComponent implements OnInit {
  user: UserResponse;
  roleSelected;
  public form: FormGroup;
  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<DialogUpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
