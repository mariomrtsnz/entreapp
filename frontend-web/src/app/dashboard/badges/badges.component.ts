import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'name', 'points', 'description', 'pois', 'actions'];
  dataSource = new MatTableDataSource();
  badges: any[] = [];
  alertMsg: string;

  constructor(private titleService: Title, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.titleService.setTitle('Badges');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllBadges(alerMsg: string) {
    this.dataSource.data = [];

  }

}
