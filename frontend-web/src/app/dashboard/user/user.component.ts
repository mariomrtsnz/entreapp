import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { UserResponse } from '../../interfaces/user-response';
import { UsersResponse } from 'src/app/interfaces/users-response';

export interface Persona {
  name: string;
  email: string;
  points: number;
}

const ELEMENT_DATA: Persona[] = [
  {name: 'pepe', email: 'pepe@pepe.com', points: 1.0079},
  {name: 'miguel', email: 'miguel@miguel.com', points: 1.0079},
];
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
  constructor(private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog, private userService: UserService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.userService.getAll().toPromise()
    .then(receivedUsers => {
      this.dataSource = new MatTableDataSource(receivedUsers.rows);
      this.dataSource.paginator = this.paginator;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }

}
