import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogCreateUserComponent } from 'src/app/dialogs/dialog-create-user/dialog-create-user.component';
import { DialogDeleteUserComponent } from 'src/app/dialogs/dialog-delete-user/dialog-delete-user.component';
import { UsersResponse } from 'src/app/interfaces/users-response';
import { UserService } from 'src/app/services/user.service';

import { DialogEditUserComponent } from '../../dialogs/dialog-edit-user/dialog-edit-user.component';
import { UserResponse } from '../../interfaces/user-response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: UsersResponse;
  userList: UserResponse[];
  displayedColumns: string[] = ['picture', 'name', 'email', 'points', 'actions'];
  dataSource;
  roles: string[];

  constructor(private snackBar: MatSnackBar, private router: Router,
    public dialog: MatDialog, private userService: UserService, private titleService: Title) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    //get all users and set tittle page
    this.getAll();
    this.titleService.setTitle('Users');
  }
  getAll() {//get all users from api
    const totalSum = 0;
    this.userService.getAll().toPromise()
      .then(receivedUsers => {
        this.dataSource = new MatTableDataSource(receivedUsers.rows);
        this.dataSource.paginator = this.paginator;
      })
      .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 }));
  }
  //it permits clients filtering app users
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //it permits clients delete users
  openDialogDeleteUser(u: UserResponse) {
    const dialogDeleteUser = this.dialog.open(DialogDeleteUserComponent, { data: { user: u } });
    dialogDeleteUser.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  //dialog to create users
  openDialogNewUser() {
    const dialogNewUser = this.dialog.open(DialogCreateUserComponent, { width: '500px' });
    dialogNewUser.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  //dialog to update users
  openDialogUpdateUser(userResponse: UserResponse) {
    const dialogUpdateUser = this.dialog.open(DialogEditUserComponent, { width: '500px', data: { user: userResponse } });
    dialogUpdateUser.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
}
