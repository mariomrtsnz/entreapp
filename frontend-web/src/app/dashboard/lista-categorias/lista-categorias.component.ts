import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Categoria } from 'src/app/interfaces/categoria';
import { DialogNuevaCategoriaComponent } from 'src/app/dialog-nueva-categoria/dialog-nueva-categoria.component';
import { DialogEditCategoriaComponent } from 'src/app/dialog-edit-categoria/dialog-edit-categoria.component';
import { DialogDeleteCategoriaComponent } from 'src/app/dialog-delete-categoria/dialog-delete-categoria.component';
@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: Categoria[];
  constructor(private categoriaService: CategoriaService, public snackBar: MatSnackBar,
    public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getListaCategorias('Lista de categorías cargada');
  }

  getListaCategorias(mensaje: string) {
    this.categoriaService.getAllCategorias().subscribe(listaCategorias => {
      this.dataSource = listaCategorias;

      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, error =>  {
      this.snackBar.open('Error al obtener categorías', 'Cerrar', {
        duration: 3000,
      });
    });
  }
  openDialogNuevaCategoria() {
    const dialogoNuevoCategoria = this.dialog.open(DialogNuevaCategoriaComponent);

    dialogoNuevoCategoria.afterClosed().subscribe(result => {
      this.getListaCategorias('Categoría creada');
    });

  }

  openDialogEditCategoria(element: Categoria) {
    const dialogoEditCategoria = this.dialog.open(DialogEditCategoriaComponent, {
      data: {categoria: element}
    });

    dialogoEditCategoria.afterClosed().subscribe(result => {
      this.getListaCategorias('Categoría editada');
    });
  }

  openDialogDeleteCategoria(element: Categoria) {
    const dialogoDeleteCategoria = this.dialog.open(DialogDeleteCategoriaComponent, {
      data: {id: element.id}
    });

    dialogoDeleteCategoria.afterClosed().subscribe(result => {
      this.getListaCategorias('Categoria eliminado');
    });
    // this.recursoService.refresh();
  }
}
