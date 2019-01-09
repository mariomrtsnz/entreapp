import { Component, OnInit, Inject } from '@angular/core';
import { SupercategoryService } from '../../services/supercategory.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-supercategory',
  templateUrl: './dialog-delete-supercategory.component.html',
  styleUrls: ['./dialog-delete-supercategory.component.scss']
})
export class DialogDeleteSuperCategoryComponent implements OnInit {
  word: string;
  constructor(private superCategoryService: SupercategoryService,
    public dialogRef: MatDialogRef<DialogDeleteSuperCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  checkWord() {
    if (this.word === 'DELETE') {
      return true;
    } else {
      return false;
    }
  }
  deleteSuperCategory() {
    this.superCategoryService.deleteSuperCategory(this.data.id).subscribe(resp => {
      console.log(resp);
    });
  }
}
