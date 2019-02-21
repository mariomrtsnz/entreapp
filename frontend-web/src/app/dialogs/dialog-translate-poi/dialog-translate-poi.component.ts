import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PoiService } from 'src/app/services/poi.service';
import { LanguageService } from 'src/app/services/language.service';

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
  idLanguage: String;
  isoCode: string;
  constructor(private afStorage: AngularFireStorage, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogTranslatePoiComponent>, public poiService: PoiService, private fb: FormBuilder,
    public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) public data: any, public languageService: LanguageService) { }

  ngOnInit() {
    //it gets the poi to translate it
    this.getOnePoi();
    this.createForm();
    this.idLanguage = this.authService.getLanguageId();
  }
  getUserIsoCode() {
    const token = this.authService.getToken();
    const languageId = this.authService.getLanguageId();
    this.languageService.getUserLanguage(languageId, token)
      .subscribe(r => {
        this.isoCode = r.isoCode;
        this.checkAndSetTranslations(this.isoCode);
      });
  }
  getOnePoi() {
    this.poiService.getOne(this.data.poi.id)
      .subscribe(r => {
        this.poiObtenido = r
        this.getUserIsoCode();

      });

  }
  createForm() {
    this.audioguidesForm = this.fb.group({
      translatedFile: [null, Validators.compose([Validators.required])]
    });

    this.descriptionForm = this.fb.group({
      translatedDescription: [null, Validators.compose([Validators.required])]
    });
  }


  checkAndSetTranslations(userIsoCode: string) {
    let posicionDescripcion = -1, posicionAudio = -1;
   
    //we take the user isocode to look for it in audioguides and description, if they don't
    //exists we show the original text (english)
    //if not we are going to look for in in the ArrayList with audio and description 
    //to show them in his language
    if (this.checkEnglishUser(userIsoCode)) {
      console.log(this.poiObtenido.audioguides.originalFile);
      this.audioguidesForm.controls['translatedFile'].setValue(this.poiObtenido.audioguides.originalFile);
      this.descriptionForm.controls['translatedDescription'].setValue(this.poiObtenido.description.originalDescription);
    } else {


      posicionDescripcion = this.checkExistDescriptionTranslation(this.poiObtenido);
      posicionAudio = this.checkExistAudioTranslation(this.poiObtenido);
      if (posicionDescripcion !== -1) {
// tslint:disable-next-line: max-line-length
        this.descriptionForm.controls['translatedDescription'].setValue(this.poiObtenido.description.translations[posicionDescripcion].translatedDescription);
      }
      if (posicionAudio !== -1) {
        this.audioguidesForm.controls['translatedFile'].setValue(this.poiObtenido.audioguides.translations[posicionAudio].translatedFile);
      }

    }
  }
  //check if the user is English
  checkEnglishUser(userIsoCode: string) {
    const englishIsoCode = 'en';
    let result = false;
    if (this.isoCode == null || this.isoCode === undefined) {
      result = true;
    } else {
      result = this.isoCode.toLowerCase() === englishIsoCode.toLocaleLowerCase();

    }
    return result;

  }
  //check if it exists a description translated in the user language 
  checkExistDescriptionTranslation(newPoi) {
    let posicionDescripcion = -1;
    for (let i = 0; i < newPoi.description.translations.length; i++) {
      if (newPoi.description.translations[i].id !== this.idLanguage) {
        posicionDescripcion = i;
      }
    }
    return posicionDescripcion;
  }
    //check if it exists a audioguide translated in the user language 

  checkExistAudioTranslation(newPoi) {
    let posicionDescripcion = -1;
    for (let i = 0; i < newPoi.audioguides.translations.length; i++) {
      if (newPoi.audioguides.translations[i].id !== this.idLanguage) {
        posicionDescripcion = i;
      }
    }
    return posicionDescripcion;
  }
  onSubmit() {
    // its created a new dto
    const englishIsoCode = 'en';
    const newPoi: PoiCreateDto = {
      audioguides: this.poiObtenido.audioguides,
      loc: this.poiObtenido.loc,
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
    const language = {
      language: String(this.poiObtenido.description.language),
    };

    let posicionDescripcion = -1, posicionAudio = -1;

    // it checks if the translation exists
    // if the language isnt english we write a translate description and audio guide
    if (!this.checkEnglishUser(this.isoCode)) {
      posicionDescripcion = this.checkExistDescriptionTranslation(newPoi);
      // tslint:disable-next-line:no-non-null-assertion
      if (posicionDescripcion !== -1) {
        newPoi.description.translations.splice(posicionDescripcion);
      }
      posicionAudio = this.checkExistAudioTranslation(newPoi);
      // tslint:disable-next-line:no-non-null-assertion
      if (posicionAudio! = -1) {
        newPoi.audioguides.translations.splice(posicionDescripcion);
      }

      // It inserts translation and audioguide
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
    } else {
      newPoi.description.originalDescription = this.descriptionForm.controls['translatedDescription'].value;
      newPoi.audioguides.originalFile = this.audioguidesForm.controls['translatedFile'].value;
    }
    // It inserts categories
    this.poiObtenido.categories.forEach(c => {
      newPoi.categories.push(c.id);
    });

    // It sends the new translations
    this.poiService.edit(this.poiObtenido.id, newPoi)
      .subscribe(r => this.dialogRef.close('confirm'),
        e => this.snackBar.open('There was an error updating the data.', 'Close', { duration: 3000 }));
  }

  //it uploads audio
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
