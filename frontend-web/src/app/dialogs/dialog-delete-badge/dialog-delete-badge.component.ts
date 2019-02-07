import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { BadgeService } from './../../services/badge.service';

@Component({
  selector: 'app-dialog-delete-badge',
  templateUrl: './dialog-delete-badge.component.html',
  styleUrls: ['./dialog-delete-badge.component.scss']
})
export class DialogDeleteBadgeComponent implements OnInit {
  elementId: string;
  elementName: string;
  checkedRobot: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private badgeService: BadgeService,
    public dialogRef: MatDialogRef<DialogDeleteBadgeComponent>, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.elementId = this.data.badgeId;
    this.elementName = this.data.badgeName;
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
    this.badgeService.remove(this.elementId).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this badge.', 'Close', { duration: 3000 }));
  }

}
