import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupercategoryService } from '../../services/supercategory.service';
import { CreateSuperCategoryDto } from '../../dto/create-supercategory.dto';

@Component({
  selector: 'app-dialog-new-supercategory',
  templateUrl: './dialog-new-supercategory.component.html',
  styleUrls: ['./dialog-new-supercategory.component.scss']
})
export class DialogNewSupercategoryComponent implements OnInit {
  name: string;
  public form: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogNewSupercategoryComponent>, private superCategoryService: SupercategoryService ) { }

  ngOnInit() {
    this.form = this.fb.group ( {
      name: [null , Validators.compose ( [ Validators.required ] )]
    });
  }
  addSuperCategory() {
    const superCategoryCreateDto = new CreateSuperCategoryDto(this.name);
    this.superCategoryService.createSuperCategory(superCategoryCreateDto).subscribe(
      () => {
        this.dialogRef.close();
      }
    );
  }
}
