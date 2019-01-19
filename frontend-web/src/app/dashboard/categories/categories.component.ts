import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Category } from 'src/app/interfaces/category';
import { CategoriesResponse } from 'src/app/interfaces/categories-response';
import { DialogNewCategoryComponent } from 'src/app/dialogs/dialog-new-category/dialog-new-category.component';
import { DialogEditCategoryComponent } from 'src/app/dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogDeleteCategoryComponent } from 'src/app/dialogs/dialog-delete-category/dialog-delete-category.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource;
  categoriesList: Category[];
  categories: CategoriesResponse;
  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthenticationService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getListCategories('List of categories loaded');
  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  getListCategories(mensaje: string) {
    const totalSum = 0;
    this.categoryService.getAllCategories().toPromise()
    .then(receivedCategories => {
      // receivedUsers.rows.forEach(badges => {totalSum+=badge.points})
      this.dataSource = new MatTableDataSource(receivedCategories.rows);
      this.dataSource.paginator = this.paginator;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
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
