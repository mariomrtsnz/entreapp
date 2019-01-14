import { Component, OnInit, Inject } from '@angular/core';
import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: UserResponse;
  constructor(private userService: UserService, public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.user = this.data;
  }

  // editUsuario() {
  //   this.userService.editUser(this.user).subscribe(nota => {
  //     this.dialogRef.close();
  //   });
  // }

}
