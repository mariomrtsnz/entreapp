import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PoiService } from 'src/app/services/poi.service';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-dialog-translate-poi',
  templateUrl: './dialog-translate-poi.component.html',
  styleUrls: ['./dialog-translate-poi.component.scss']
})
export class DialogTranslatePoiComponent implements OnInit {
  audioguidesForm: FormGroup;
  descriptionForm: FormGroup;
  constructor(private afStorage: AngularFireStorage, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogTranslatePoiComponent>, public poiService: PoiService,private fb: FormBuilder, public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createForm();
    console.log('dialog translated')
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
    console.log('onSubmit')
    const translatedPoi: PoiCreateDto = < PoiCreateDto > this.data.poi;
    console.log('1º translatedpoi '+translatedPoi);
    //translatedPoi.description.
    const languageId: string = this.authService.getLanguageId();
    const audioG: string= this.audioguidesForm.value;
    let tempTranslation = null;
    const translation = {
      'id': languageId,
      'translatedFile': audioG
    }

    translatedPoi.audioguides.translations.forEach((translation => {
      if (translation.id != languageId) {
        tempTranslation = translation;
      } else {
        translation.translatedFile = audioG;
      }
    }))
    if (tempTranslation != null) {
      translatedPoi.audioguides.translations.push(translation);
    }
    console.log('2º translated poi '+translatedPoi)

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
        .subscribe(r => 
          this.audioguidesForm.controls['originalFile'].setValue(r)
        )))
      .subscribe();
  }

}
