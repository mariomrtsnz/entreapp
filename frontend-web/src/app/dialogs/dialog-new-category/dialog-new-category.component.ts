import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryCreateDto } from '../../dto/create-category.dto';
import { Category } from 'src/app/interfaces/category';
import { CategoriesResponse } from 'src/app/interfaces/categories-response';

@Component({
  selector: 'app-dialog-new-category.component',
  templateUrl: './dialog-new-category.component.html',
  styleUrls: ['./dialog-new-category.component.scss']
})
export class DialogNewCategoryComponent implements OnInit {
  name: string;
  categorySelected: Category;
  categories: CategoriesResponse;
  public form: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogNewCategoryComponent>) { }

  ngOnInit() {
    this.form = this.fb.group ( {
      name: [null , Validators.compose ( [ Validators.required ] )]
    });
    this.getCategories();

  }

  addCategory() {
    const categoryCreateDto = new CategoryCreateDto(this.name, this.categorySelected);
    this.categoryService.createCategory(categoryCreateDto).subscribe(
      categoria => {
        this.dialogRef.close();
      }
    );
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result;
    });
  }
}
