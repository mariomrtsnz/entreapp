import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryCreateDto } from '../../dto/create-category.dto';

@Component({
  selector: 'app-dialog-new-category.component',
  templateUrl: './dialog-new-category.component.html',
  styleUrls: ['./dialog-new-category.component.scss']
})
export class DialogNewCategoryComponent implements OnInit {
  name: string;
  idSuperCategory: number;
  public form: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogNewCategoryComponent>) { }

  ngOnInit() {
    this.form = this.fb.group ( {
      name: [null , Validators.compose ( [ Validators.required ] )]
    });
  }

  addCategory() {
    const categoryCreateDto = new CategoryCreateDto(this.name, this.idSuperCategory);
    this.categoryService.createCategory(categoryCreateDto).subscribe(
      categoria => {
        this.dialogRef.close();
      }
    );
  }
}
