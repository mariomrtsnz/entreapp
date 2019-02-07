import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogUpdateProfileComponent } from 'src/app/dialogs/dialog-update-profile/dialog-update-profile.component';
import { UserService } from 'src/app/services/user.service';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  opened = false;
  over = 'over';
  loggedUser = null;
  alertMessage: string;

  constructor(private snackBar: MatSnackBar, public router: Router, public dialog: MatDialog,
    public authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = this.getLoggedUserInfo();
  }

  getLoggedUserInfo() {
    return {
      'username': this.authService.getName(),
      'email': this.authService.getEmail(),
      'picture': this.authService.getPicture()
    };
  }

  openUpdateProfile() {
    const editableUser = this.userService.getOneByEmail(this.authService.getEmail());
    const editUserDialog = this.dialog.open(DialogUpdateProfileComponent, { panelClass: 'add-dialog', data: { usuario: editableUser } });

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
