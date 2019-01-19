import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryCreateDto } from '../../dto/create-category.dto';
import { Category } from 'src/app/interfaces/category';
import { CategoriesResponse } from 'src/app/interfaces/categories-response';

@Component({
  selector: 'app-dialog-create-category.component',
  templateUrl: './dialog-create-category.component.html',
  styleUrls: ['./dialog-create-category.component.scss']
})
export class DialogCreateCategoryComponent implements OnInit {
  allCategories: Category[];
  form: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogCreateCategoryComponent>) { }

  ngOnInit() {
    this.getCategories();
    this.createForm();
  }
  createForm()  {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      parent: [null]
    });
  }

  addCategory() {
    const categoryCreateDto: CategoryCreateDto = <CategoryCreateDto>this.form.value;
    this.categoryService.createCategory(categoryCreateDto).subscribe(
      categoria => {
        this.dialogRef.close();
      }
    );
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(r => this.allCategories = r.rows);
  }
}
