import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogPoiDeleteComponent } from 'src/app/dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent implements OnInit {

  poi: OnePoiResponse;
  coverImage: string;
  showSettings = false;
  constructor(private poiService: PoiService, public router: Router,
    public dialog: MatDialog, public snackBar: MatSnackBar, private titleService: Title, private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.poiService.selectedPoi == null) {
      this.router.navigate(['home']);
    } else {
      this.getData();
    }
    this.titleService.setTitle('Details - POI');
  }
  
  checkEnglishUser() {
    const englishIsoCode = 'en';
    const userIsoCode = this.authService.getIsoCode();
    let result = false;
    if (userIsoCode == null || userIsoCode === undefined) {
      result = true;
    } else {
      result = userIsoCode.toLowerCase() === englishIsoCode.toLocaleLowerCase();

    }
    return result;

  }

  checkExistDescriptionTranslation(newPoi) {
    let posicionDescripcion = -1;

    for (let i = 0; i < newPoi.description.translations.length; i++) {
      if (newPoi.description.translations[i].id !== this.authService.getLanguageId()) {
        posicionDescripcion = i;
      }
    }
    return posicionDescripcion;
  }

  checkExistAudioTranslation(newPoi) {
    let posicionDescripcion = -1;
    for (let i = 0; i < newPoi.audioguides.translations.length; i++) {
      if (newPoi.audioguides.translations[i].id !== this.authService.getLanguageId()) {
        posicionDescripcion = i;
      }
    }
    return posicionDescripcion;
  }

  /** Api call to get all the data */
  getData() {
    this.poiService.getOne(this.poiService.selectedPoi.id).subscribe(p => {
      this.poi = p;
      this.coverImage = p.coverImage;
      let posicionDescripcion = -1, posicionAudio = -1;
      let textoTraducido = '', audioTraducido = '';
      if (!this.checkEnglishUser()) {
        // obtenemos posicion del texto
        posicionDescripcion = this.checkExistDescriptionTranslation(this.poi);
        posicionAudio = this.checkExistAudioTranslation(this.poi);

        if (posicionDescripcion !== -1) {
          textoTraducido = this.poi.description.translations[posicionDescripcion].translatedDescription;
          this.poi.description.originalDescription = textoTraducido;
        }
        if (posicionAudio !== -1) {
          audioTraducido = this.poi.audioguides.translations[posicionAudio].translatedFile;
          this.poi.audioguides.originalFile = audioTraducido;
        }

      }

    });
    // si el usuario es de otro idioma le seteo el texto original al poi para que muestre ese
    // comprobamos si el usuario no es ingles,
    // buscamos por la id de lenguage del usuario que posicion en el poi tiene su descripcion

  }

  /** Open the view to edit a POI */
  openEditPoi() {
    this.poiService.selectedPoi = this.poi;
    this.router.navigate(['home/edit']);
  }

  /** Open the dialog to delete this POI */
  openDialogDeletePoi() {
    const dialogDeletePoi = this.dialog.open(DialogPoiDeleteComponent, { data: { poi: this.poi } });
    dialogDeletePoi.afterClosed().subscribe(res => res === 'confirm' ? this.router.navigate['/home'] : null,
      err => this.snackBar.open('There was an error when we were deleting this POI.', 'Close', { duration: 3000 }));
  }

  /** Set the image hovered as Cover (Like a carousel) */
  setAsCover(image: string) {
    this.coverImage = image;
  }


}
