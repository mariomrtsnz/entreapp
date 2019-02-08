import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { CategoryCreateDto } from './../../dto/create-category.dto';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.scss']
})
export class DialogEditCategoryComponent implements OnInit {
  category: Category;
  categories: Category[];
  public form: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.category = this.data.category;
    this.getCategories();
    this.form = this.fb.group({
      name: [this.data.category.name, Validators.compose([Validators.required])],
      parent: [this.data.category.parent, Validators.compose([Validators.required])]
    });
  }

  editCategory() {
    const categoryEditDto: CategoryCreateDto = <CategoryCreateDto>this.form.value;
    this.categoryService.updateCategory(this.category.id, categoryEditDto).subscribe(categoria => {
      this.dialogRef.close();
    });
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result.rows;
    });
  }
}
