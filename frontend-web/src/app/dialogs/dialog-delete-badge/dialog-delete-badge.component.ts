import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BadgeService } from './../../services/badge.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-delete-badge',
  templateUrl: './dialog-delete-badge.component.html',
  styleUrls: ['./dialog-delete-badge.component.scss']
})
export class DialogDeleteBadgeComponent implements OnInit {
  badgeId: string;
  badgeName: string;
  checkedRobot: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private badgeService: BadgeService, public dialogRef: MatDialogRef<DialogDeleteBadgeComponent>) { }

  ngOnInit() {
    this.badgeId = this.data.badgeId;
    this.badgeName = this.data.badgeName;
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

  deleteBadge() {
    console.log(this.badgeId);
    this.badgeService.remove(this.badgeId).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => {
      console.log(error);
    });
  }

}
