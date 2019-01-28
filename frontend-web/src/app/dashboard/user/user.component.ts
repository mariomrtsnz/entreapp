import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from '../../interfaces/user-response';
import { UsersResponse } from 'src/app/interfaces/users-response';
import { DialogDeleteUserComponent } from 'src/app/dialogs/dialog-delete-user/dialog-delete-user.component';
import { DialogCreateUserComponent } from 'src/app/dialogs/dialog-create-user/dialog-create-user.component';
import { DialogEditUserComponent } from '../../dialogs/dialog-edit-user/dialog-edit-user.component';
import { Title } from '@angular/platform-browser';

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
  // tslint:disable-next-line:max-line-length
  constructor(private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog, private userService: UserService, private titleService: Title) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getAll();
    this.titleService.setTitle('Users');
  }
  getAll() {
    const totalSum = 0;
    this.userService.getAll().toPromise()
    .then(receivedUsers => {
      // receivedUsers.rows.forEach(badges => {totalSum+=badge.points})
      this.dataSource = new MatTableDataSource(receivedUsers.rows);
      this.dataSource.paginator = this.paginator;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialogDeleteUser(u: UserResponse) {
    const dialogDeleteUser = this.dialog.open(DialogDeleteUserComponent, {data: {user: u}});
    dialogDeleteUser.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were deleting this User.', 'Close', {duration: 3000}));
  }
  openDialogNewUser() {
    const dialogNewUser = this.dialog.open(DialogCreateUserComponent, {width: '500px'});
    dialogNewUser.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were creating a new User.', 'Close', {duration: 3000}));
  }
  openDialogUpdateUser(userResponse: UserResponse) {
    const dialogUpdateUser = this.dialog.open(DialogEditUserComponent,  {width: '500px', data: {user: userResponse}});
    dialogUpdateUser.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were updating this User.', 'Close', {duration: 3000}));
  }
}
