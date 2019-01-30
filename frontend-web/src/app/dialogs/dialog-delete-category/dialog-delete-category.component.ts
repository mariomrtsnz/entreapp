import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent implements OnInit {
  checkedRobot: boolean;

  constructor(private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogDeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    }, error => {
      console.log(error);
    });
  }
}
