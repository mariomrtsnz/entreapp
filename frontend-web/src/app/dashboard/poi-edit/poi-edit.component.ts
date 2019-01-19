import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { Category } from 'src/app/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PoiService } from 'src/app/services/poi.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PoiResponse } from 'src/app/interfaces/poi-response';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.scss']
})
export class PoiEditComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  urlImage: Array<string> = [];

  poi: OnePoiResponse;
  categories: Category;

  coordinatesForm: FormGroup;
  form: FormGroup;
  audioguidesForm: FormGroup;
  descriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private poiService: PoiService,
    public router: Router, public snackBar: MatSnackBar, private afStorage: AngularFireStorage) { }

  ngOnInit() {
    if (this.poiService.selectedPoi == null) {
      this.router.navigate(['home']);
    } else {
      this.createForm();
      this.getData();
    }
  }

  getData() {
    this.poiService.getOne(this.poiService.selectedPoi.id).subscribe(p => {
      this.poi = p;
      this.urlImage = p.images;
      this.setForms();
    });
  }

  createForm() {
    this.coordinatesForm = this.fb.group({
      lat: [null, Validators.compose([Validators.required])],
      lng: [null, Validators.compose([Validators.required])]
    });

    this.audioguidesForm = this.fb.group({
      originalFile: [null, Validators.compose([Validators.required])]
    });

    this.descriptionForm = this.fb.group({
      originalDescription: [null, Validators.compose([Validators.required])]
    });

    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])],
      creator: [null],
      images: [null, Validators.compose([Validators.required])],
      // categories: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      schedule: [null, Validators.compose([Validators.required])],
      price: [null],
    });
  }

  setForms() {
    this.coordinatesForm = this.fb.group({
      lat: [this.poi.coordinates.lat, Validators.compose([Validators.required])],
      lng: [this.poi.coordinates.lng, Validators.compose([Validators.required])]
    });

    this.audioguidesForm = this.fb.group({
      originalFile: [this.poi.audioguides.originalFile, Validators.compose([Validators.required])]
    });

    this.descriptionForm = this.fb.group({
      originalDescription: [this.poi.description.originalDescription.substr(3), Validators.compose([Validators.required])]
    });

    this.form = this.fb.group({
      name: [this.poi.name, Validators.compose([Validators.required])],
      year: [this.poi.year, Validators.compose([Validators.required])],
      creator: [this.poi.creator],
      images: [this.poi.images, Validators.compose([Validators.required])],
      // categories: [null, Validators.compose([Validators.required])],
      status: [this.poi.status, Validators.compose([Validators.required])],
      schedule: [this.poi.schedule, Validators.compose([Validators.required])],
      price: [this.poi.price],
    });
  }

  showPoi() {
    console.log(this.poi);
  }

  onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    this.descriptionForm.controls['originalDescription'].setValue('en-' + this.descriptionForm.controls['originalDescription'].value);
    newPoi.coordinates = this.coordinatesForm.value;
    newPoi.audioguides = this.audioguidesForm.value;
    newPoi.description = this.descriptionForm.value;
    newPoi.coverImage = this.form.controls['images'].value;
    this.poiService.edit(this.poi.id, newPoi).toPromise()
      .then(() => this.router.navigate(['/home']))
      .catch(() => this.snackBar.open('Error al crear localización.', 'Cerrar', { duration: 3000 }));
  }

  ImgUpload(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[i];
      const filePath = `img/poi/${id}`;
      const ref = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => ref.getDownloadURL()
          .subscribe(r => {
            this.urlImage.push(r);
            this.form.controls['images'].setValue(this.urlImage);
          })))
        .subscribe();
    }
  }

  audioUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `audioguides/en-${id}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL()
        .subscribe(r => {
          this.audioguidesForm.controls['originalFile'].setValue(r);
        })))
      .subscribe();
  }

}
