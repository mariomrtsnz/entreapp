import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/interfaces/user-response';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService} from '../../services/authentication.service';
import { DialogEditUserComponent } from '../../dialogs/dialog-edit-user/dialog-edit-user.component';
import { DialogUpdateProfileComponent } from 'src/app/dialogs/dialog-update-profile/dialog-update-profile.component';
import { UserUpdateMyProfileDto } from 'src/app/dto/user-update-my-profile.dto';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  name: String;
  email: String;
  images: any[] = [];
  num = 1;

  pieChartColors: any[] = [{
    backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
  }];

  pieOptions: any = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };

  pieChartLabels: string[] = ['MS Word', 'Typing', 'Sage Pastel'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType = 'pie';

  user: UserResponse;

  constructor(private userService: UserService,  private router: Router,
    private authService: AuthenticationService,
    public snackBar: MatSnackBar, public dialog: MatDialog) {

    }

  ngOnInit() {
    this.getMe();

  }

  getMe() {
    this.userService.getMe().subscribe(result => {
      this.user = result;
    });
  }

  openDialogEditUser(user: UserResponse) {
    const dialogEditUser = this.dialog.open(DialogUpdateProfileComponent, {
      data: {user: user},
      width: '50%',
      height: '70%'
    });

    dialogEditUser.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
