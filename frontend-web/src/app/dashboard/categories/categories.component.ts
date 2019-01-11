import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Category } from 'src/app/interfaces/category';
import { DialogNewCategoryComponent } from 'src/app/dialogs/dialog-new-category/dialog-new-category.component';
import { DialogEditCategoryComponent } from 'src/app/dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogDeleteCategoryComponent } from 'src/app/dialogs/dialog-delete-category/dialog-delete-category.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: Category[];
  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getListCategories('List of categories loaded');
  }

  getListCategories(mensaje: string) {
    this.categoryService.getAllCategories().subscribe(listaCategories => {
      this.dataSource = listaCategories;

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
  openDialogNewCategory() {
    const dialogoNuevoCategory = this.dialog.open(DialogNewCategoryComponent);

    dialogoNuevoCategory.afterClosed().subscribe(result => {
      this.getListCategories('Category created');
    });

  }

  openDialogEditCategory(element: Category) {
    const dialogoEditCategory = this.dialog.open(DialogEditCategoryComponent, {
      data: {category: element}
    });

    dialogoEditCategory.afterClosed().subscribe(result => {
      this.getListCategories('Category edited');
    });
  }

  openDialogDeleteCategory(element: Category) {
    const dialogoDeleteCategory = this.dialog.open(DialogDeleteCategoryComponent, {
      data: {id: element.id}
    });

    dialogoDeleteCategory.afterClosed().subscribe(result => {
      this.getListCategories('Category deleted');
    });
  }
}
