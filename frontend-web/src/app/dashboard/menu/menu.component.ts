import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { DialogUpdateProfileComponent } from 'src/app/dialogs/dialog-update-profile/dialog-update-profile.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  opened = false;
  over = 'over';
  loggedUserName: string;
  alertMessage: string;

  // tslint:disable-next-line:max-line-length
  constructor(private snackBar: MatSnackBar, public router: Router, public dialog: MatDialog, public authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.loggedUserName = this.authService.getName();
  }

  openUpdateProfile() {
    const editableUser = this.userService.getOneByEmail(this.authService.getEmail());
    // tslint:disable-next-line:max-line-length
    const editUserDialog = this.dialog.open(DialogUpdateProfileComponent, {panelClass: 'add-dialog', data: {usuario: editableUser}});

    editUserDialog.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.alertMessage = 'Usuario editado';
        this.snackBar.open(this.alertMessage, 'x', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }


}
