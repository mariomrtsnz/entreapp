import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SupercategoryService } from 'src/app/services/supercategory.service';
import { Supercategory } from 'src/app/interfaces/supercategory';
import { DialogNewSupercategoryComponent } from 'src/app/dialogs/dialog-new-supercategory/dialog-new-supercategory.component';
import { DialogEditSupercategoryComponent } from 'src/app/dialogs/dialog-edit-supercategory/dialog-edit-supercategory.component';
@Component({
  selector: 'app-supercategories',
  templateUrl: './supercategories.component.html',
  styleUrls: ['./supercategories.component.scss']
})
export class SuperCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'accions'];
  dataSource: Supercategory[];
  constructor(private superCategoryService: SupercategoryService, public snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getListSuperCategories('List of supercategories loaded');
  }
  getListSuperCategories(mensaje: string) {
    this.superCategoryService.getAllSuperCategories().subscribe(listSuperCategories => {
      this.dataSource = listSuperCategories;

      this.snackBar.open(mensaje, 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, error =>  {
      this.snackBar.open('Error', 'Close', {
        duration: 3000,
      });
    });
  }
  openDialogNewSuperCategory() {
    const dialogNewSuperCategory = this.dialog.open(DialogNewSupercategoryComponent);

    dialogNewSuperCategory.afterClosed().subscribe(result => {
      this.getListSuperCategories('Super Category created');
    });

  }

  openDialogEditSuperCategory(element: Supercategory) {
    const dialogEditSuperCategory = this.dialog.open(DialogEditSupercategoryComponent, {
      data: {superCategory: element}
    });

    dialogEditSuperCategory.afterClosed().subscribe(result => {
      this.getListSuperCategories('Super Category edited');
    });
  }
}
