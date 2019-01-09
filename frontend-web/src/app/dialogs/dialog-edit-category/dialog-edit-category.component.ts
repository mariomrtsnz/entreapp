import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.scss']
})
export class DialogEditCategoryComponent implements OnInit {
  category: Category;
  constructor(private categoriaService: CategoryService,
    public dialogRef: MatDialogRef<DialogEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.category = this.data.category;
  }

  editCategory() {
    this.categoriaService.updateCategory(this.category).subscribe(categoria => {
      this.dialogRef.close();
    });
  }

}
