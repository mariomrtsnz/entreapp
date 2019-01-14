import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthenticationService} from '../../services/authentication.service';
import { UserResponse } from '../../interfaces/user-response';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
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
  constructor(private userService: UserService, private authService: AuthenticationService,
    public snackBar: MatSnackBar, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getOneByEmail(this.authService.getEmail()).suscribe(user => {
      this.user = user;
    });
  }

}
