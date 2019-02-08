import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent implements OnInit {
  checkedRobot: boolean;

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogDeleteCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }
  delete() {
    this.categoryService.deleteCategory(this.data.id).subscribe(resp => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this category.', 'Close', {duration: 3000}));
  }
}
