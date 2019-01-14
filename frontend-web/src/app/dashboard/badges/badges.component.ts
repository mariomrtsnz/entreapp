import { BadgeService } from './../../services/badge.service';
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
  dataSource;
  badges: any[] = [];
  alertMsg: string;

  // tslint:disable-next-line:max-line-length
  constructor(private titleService: Title, private snackBar: MatSnackBar, private badgeService: BadgeService, private router: Router, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.titleService.setTitle('Badges');
    this.getAllBadges('Success retrieving items.');
  }

  getAllBadges(message: string) {
    this.badgeService.getAll().subscribe(receivedBadges => {
      this.dataSource = new MatTableDataSource(receivedBadges.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('There was an error loading the data.', 'Close', {duration: 3000});
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
