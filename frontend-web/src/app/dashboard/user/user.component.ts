import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
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
  displayedColumns: string[] = ['picture', 'name', 'email', 'points', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor(private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  }

}
