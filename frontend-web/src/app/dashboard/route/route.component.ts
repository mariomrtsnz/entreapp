import { Observable } from 'rxjs';
import { DialogRouteComponent } from './../../dialogs/dialog-route/dialog-route.component';
import { DialogDeleteRouteComponent } from './../../dialogs/dialog-delete-route/dialog-delete-route.component';
import { OneRouteResponse } from './../../interfaces/one-route-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { PoiService } from 'src/app/services/poi.service';
import { RouteService } from 'src/app/services/route.service';
import { RouteResponse } from 'src/app/interfaces/route-response';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  routes: RouteResponse;

  constructor(private routeService: RouteService, private poiService: PoiService, public dialog: MatDialog,
    private authService: AuthenticationService, public router: Router, public snackBar: MatSnackBar, private titleService: Title) { }

  ngOnInit() {
    this.getAll();
    this.titleService.setTitle('Routes');
    console.log(this.routes);
  }

  // NO FUNCIONA
  getAll() {
    this.routeService.getAll().subscribe(result => {
      console.log(`Result: ${result}`);
      this.routes = result;
      console.log(this.routes);
    }, err => {
        this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000});
    });
  }

  openDialogNewRoute() {
    const dialogNewRoute = this.dialog.open(DialogRouteComponent, {width: '500px'});
    dialogNewRoute.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were creating a new Route.', 'Close', {duration: 3000}));
  }

  openDialogEditRoute(r: RouteResponse) {
    const dialogEditRoute = this.dialog.open(DialogRouteComponent, {data: {route: r}, width: '500px' });
    dialogEditRoute.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were updating this Route.', 'Close', {duration: 3000}));
  }

  openDialogDeleteRoute(r: OneRouteResponse) {
    const dialogDeleteRoute = this.dialog.open(DialogDeleteRouteComponent, {data: {routeId: r.id, routeName: r.name}});
    dialogDeleteRoute.afterClosed().subscribe(res => res === 'confirm' ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were deleting this Route.', 'Close', {duration: 3000}));
  }

  goRouteDetails(r: OneRouteResponse) {
    this.routeService.selectedRoute = r;
    this.router.navigate(['home/route/details']);
  }

  createRouteImage(r: OneRouteResponse) {
    const coverImagesArr: string[] = [];

    r.pois.forEach(poi => {
      coverImagesArr.push(poi.coverImage);
    });
    console.log(coverImagesArr);
  }
}
