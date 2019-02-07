import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PoiService } from 'src/app/services/poi.service';

@Component({
  selector: 'app-dialog-translate-poi',
  templateUrl: './dialog-translate-poi.component.html',
  styleUrls: ['./dialog-translate-poi.component.scss']
})
export class DialogTranslatePoiComponent implements OnInit {
  audioguidesForm: FormGroup;
  descriptionForm: FormGroup;
  urlAudioguide: string;
  poiObtenido: OnePoiResponse;

  constructor(private afStorage: AngularFireStorage, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogTranslatePoiComponent>, public poiService: PoiService, private fb: FormBuilder,
    public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getOnePoi();
    this.createForm();

  }
  getOnePoi() {
    this.poiService.getOne(this.data.poi.id)
      .subscribe(r => this.poiObtenido = r);

  }
  createForm() {
    this.audioguidesForm = this.fb.group({
      translatedFile: [null, Validators.compose([Validators.required])]
    });

    this.descriptionForm = this.fb.group({
      translatedDescription: [null, Validators.compose([Validators.required])]
    });
  }


  // onSubmit() {

  //   const translatedPoi = this.poiObtenido;
  //   console.log(this.poiObtenido.categories);
  //   console.log(this.poiObtenido.categories.length);
  //   const cats = [];
  //   for (let i = 0; i <= this.poiObtenido.categories.length; i++) {
  //     cats.push(this.poiObtenido.categories[i].id);
  //     console.log(this.poiObtenido.categories[i]);
  //   }
  //   this.form.controls['categories'].setValue(cats);

  //   let posicionAudio = -1, posicionDescripcion = -1;
  //   // translatedPoi.description.
  //   const languageId: string = this.authService.getLanguageId();

  //   const translation = {
  //     'id': languageId,
  //     'translatedFile': this.audioguidesForm.controls['originalFile'].value
  //   };

  //   // comprobar si el audio existe
  //   for (let index = 0; index < translatedPoi.audioguides.translations.length; index++) {
  //     if (translatedPoi.audioguides.translations[index].id !== languageId) {
  //       posicionAudio = index;
  //     }
  //   }
  //   if (posicionAudio !== -1) {
  //     translatedPoi.audioguides.translations.splice(posicionAudio);
  //   }
  //   translatedPoi.audioguides.translations.push(translation);
  //   // comprobar si la descripcion existe

  //   for (let index = 0; index < translatedPoi.description.translations.length; index++) {
  //     if (translatedPoi.description.translations[index].id !== languageId) {
  //       posicionDescripcion = index;
  //     }
  //   }

  //   if (posicionDescripcion !== -1) {
  //     translatedPoi.description.translations.splice(posicionDescripcion);
  //   }
  //   const translationDescription = {
  //     'id': languageId,
  //     'translatedDescription': this.descriptionForm.controls['originalDescription'].value
  //   };

  //   translatedPoi.description.translations.push(translationDescription);

  //   // translatedPoi.descriptions.translations.push(translation);
  //   console.log('2º translated poi ');
  //   console.log(translatedPoi);

  //   this.poiService.edit(this.data.poi.id, translatedPoi).subscribe(result => {
  //     this.dialogRef.close(result);
  //   }, error => {
  //     console.log(error);
  //     this.snackBar.open('Failed to translate POI.', 'Close', {
  //       duration: 3000
  //     });
  //   });
  // }

  onSubmit() {

    // Creo un objeto PoiCreateDto con los datos del obtenido
    const newPoi: PoiCreateDto = {
      audioguides: this.poiObtenido.audioguides,
      coordinates: this.poiObtenido.coordinates,
      categories: [],
      creator: this.poiObtenido.creator,
      name: this.poiObtenido.name,
      coverImage: this.poiObtenido.coverImage,
      images: this.poiObtenido.images,
      price: this.poiObtenido.price,
      schedule: this.poiObtenido.schedule,
      status: this.poiObtenido.status,
      year: this.poiObtenido.year,
      description: this.poiObtenido.description,
    };
    // Introduzco las categorias.
    this.poiObtenido.categories.forEach(c => {
      newPoi.categories.push(c.id);
    });
    // Inserto la nueva traduccion
    newPoi.description.translations.push(
      {
        id: this.authService.getLanguageId(),
        translatedDescription: this.descriptionForm.controls['translatedDescription'].value
      });
    newPoi.audioguides.translations.push(
      {
        id: this.authService.getLanguageId(),
        translatedFile: this.audioguidesForm.controls['translatedFile'].value
      });
    // Se envía
    this.poiService.edit(this.poiObtenido.id, newPoi)
      .subscribe(r => this.dialogRef.close('confirm'),
        e => this.snackBar.open('There was an error updating the data.', 'Close', { duration: 3000 }));
  }

  audioUpload(e) {
    const randomId = Math.random().toString(36).substring(2);
    const timeId = new Date().getTime();
    const file = e.target.files[0];
    const filePath = `audioguides/${randomId}-${timeId}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL()
        .subscribe(r => {
          this.urlAudioguide = r;
          this.audioguidesForm.controls['translatedFile'].setValue(r);
        }

        )))
      .subscribe();
  }

}
