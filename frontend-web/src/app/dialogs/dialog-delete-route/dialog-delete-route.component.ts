import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-dialog-delete-route',
  templateUrl: './dialog-delete-route.component.html',
  styleUrls: ['./dialog-delete-route.component.scss']
})
export class DialogDeleteRouteComponent implements OnInit {
  elementId: string;
  elementName: string;
  checkedRobot: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,
  private routeService: RouteService, public dialogRef: MatDialogRef<DialogDeleteRouteComponent>) { }

  ngOnInit() {
    this.elementId = this.data.routeId;
    this.elementName = this.data.routeName;
  }

  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }

  close() {
    this.dialogRef.close('cancel');
  }

  delete() {
    this.routeService.remove(this.elementId).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this route.', 'Close', {duration: 3000}));
  }

}
