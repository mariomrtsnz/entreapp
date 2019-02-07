import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PoiService } from 'src/app/services/poi.service';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
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
  constructor(private afStorage: AngularFireStorage, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogTranslatePoiComponent>, public poiService: PoiService,private fb: FormBuilder, public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    this.getOnePoi();

  }
  getOnePoi(){
    this.poiService.getOne(this.data.poi.id)
      .subscribe(r => this.poiObtenido = r);
  
  }
  createForm() {
   

    this.audioguidesForm = this.fb.group({
      originalFile: [null, Validators.compose([Validators.required])]
    });

    this.descriptionForm = this.fb.group({
      originalDescription: [null, Validators.compose([Validators.required])]
    });

  }

  
  onSubmit() {
    
    const translatedPoi: PoiCreateDto = <PoiCreateDto><unknown> this.poiObtenido;
    console.log(this.poiObtenido.categories);
    
    translatedPoi.categories = [];
    for (let i = 0; i < this.poiObtenido.categories.length; i++) {      
      translatedPoi.categories.push(this.poiObtenido.categories[0].id);
      console.log(this.poiObtenido.categories[0]);
    }

    this.poiObtenido.categories.forEach(c => {
      translatedPoi.categories.push(c.id);
    });
    let posicionAudio=-1, posicionDescripcion=-1;
    //translatedPoi.description.
    const languageId: string = this.authService.getLanguageId();
    
    
    let tempTranslation = null;
    const translation = {
      'id': languageId,
      'translatedFile': this.audioguidesForm.controls['originalFile'].value
    }
    
    //comprobar si el audio existe
    for (let index = 0; index < translatedPoi.audioguides.translations.length; index++) {
      if (translatedPoi.audioguides.translations[index].id != languageId) {
        posicionAudio = index;
      }  
    }
    if(posicionAudio!=-1){
      translatedPoi.audioguides.translations.splice(posicionAudio)
    }
    translatedPoi.audioguides.translations.push(translation);
    //comprobar si la descripcion existe
    
    for (let index = 0; index < translatedPoi.description.translations.length; index++) {
      if (translatedPoi.description.translations[index].id != languageId) {
        posicionDescripcion = index;
      }  
    }

    if(posicionDescripcion!=-1){
      translatedPoi.description.translations.splice(posicionDescripcion)
    }
    const translationDescription = {
      'id': languageId,
      'translatedDescription': this.descriptionForm.controls['originalDescription'].value
    }
    translatedPoi.description.translations.push(translationDescription);

    //translatedPoi.descriptions.translations.push(translation);
    console.log('2º translated poi ')
    console.log(translatedPoi);

    this.poiService.edit(this.data.poi.id, translatedPoi).subscribe(result => {
      this.dialogRef.close(result);
    }, error => {
      console.log(error);
      this.snackBar.open('Failed to translate POI.', 'Close', {
        duration: 3000
      });
    });
  }
  
  audioUpload(e) {
    // const id = Math.random().toString(36).substring(2);
    const id = new Date().getTime();
    const file = e.target.files[0];
    const filePath = `audioguides/${id}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL()
        .subscribe(r => {
          this.urlAudioguide = r;
          this.audioguidesForm.controls['originalFile'].setValue(r)
          console.log(this.audioguidesForm.controls['originalFile'].value)
        }
          
        )))
      .subscribe();
  }

}
