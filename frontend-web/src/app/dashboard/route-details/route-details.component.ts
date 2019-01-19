import { DialogDeleteRouteComponent } from './../../dialogs/dialog-delete-route/dialog-delete-route.component';
import { DialogRouteComponent } from './../../dialogs/dialog-route/dialog-route.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { OneRouteResponse } from 'src/app/interfaces/one-route-response';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import { RouteResponse } from 'src/app/interfaces/route-response';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {
  route: OneRouteResponse;

  constructor(private routeService: RouteService, public router: Router, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.routeService.selectedRoute == null) {
      this.router.navigate(['home']);
    } else {
      this.getData();
    }
  }

  getData() {
    this.routeService.getOne(this.routeService.selectedRoute.id).subscribe(r => {
      this.route = r;
    })
  }

  openDialogEditRoute(r: RouteResponse) {
    const dialogEditRoute = this.dialog.open(DialogRouteComponent, {data: {route: r}, width: '500px' });
    dialogEditRoute.afterClosed().subscribe(res => res === 'confirm' ? this.router.navigate['/home/routes'] : null,
    err => this.snackBar.open('There was an error when we were updating this Route.', 'Close', {duration: 3000}));
  }

  openDialogDeleteRoute(r: OneRouteResponse) {
    // tslint:disable-next-line:max-line-length
    const dialogDeleteRoute = this.dialog.open(DialogDeleteRouteComponent, {panelClass: 'delete-dialog', data: {routeId: r.id, routeName: r.name}});
    dialogDeleteRoute.afterClosed().subscribe(res => res === 'confirm' ? this.router.navigate['/home/routes'] : null,
    err => this.snackBar.open('There was an error when we were deleting this Route.', 'Close', {duration: 3000}));
  }

  calcTotalDistanceInKm(r: OneRouteResponse) {
    return 0;
  }

  calcWidth(r: OneRouteResponse) {
    const maxImgWidthPcntg = 100;
    return maxImgWidthPcntg / r.pois.length;
  }

}
