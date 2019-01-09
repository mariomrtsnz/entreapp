import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupercategoryService } from '../../services/supercategory.service';
import { Supercategory } from '../../interfaces/supercategory';
@Component({
  selector: 'app-dialog-edit-supercategory',
  templateUrl: './dialog-edit-supercategory.component.html',
  styleUrls: ['./dialog-edit-supercategory.component.scss']
})
export class DialogEditSupercategoryComponent implements OnInit {
  superCategory: Supercategory;
  constructor(private superCategoryService: SupercategoryService, public dialogRef: MatDialogRef<DialogEditSupercategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.superCategory = this.data.superCategory;
  }
  editSuperCategory() {
    this.superCategoryService.updateSuperCategory(this.superCategory).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
