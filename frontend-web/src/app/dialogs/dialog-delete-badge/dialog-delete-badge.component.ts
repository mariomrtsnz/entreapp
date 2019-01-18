import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BadgeService } from './../../services/badge.service';
import { Component, OnInit, Inject } from '@angular/core';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private badgeService: BadgeService, public dialogRef: MatDialogRef<DialogDeleteBadgeComponent>) { }

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
    console.log(this.elementId);
    this.badgeService.remove(this.elementId).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => {
      console.log(error);
    });
  }

}
