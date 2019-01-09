import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'points'];
  dataSource;
  constructor(private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  }

}
