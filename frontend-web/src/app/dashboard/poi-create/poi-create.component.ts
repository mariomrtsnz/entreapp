import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { CategoriesResponse } from 'src/app/interfaces/categories-response';
import { CategoryService } from 'src/app/services/category.service';
import { PoiService } from 'src/app/services/poi.service';


@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.scss']
})
export class PoiCreateComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  urlImage: Array<string> = [];
  urlAudioguide: string;

  poi: PoiCreateDto;
  allCategories: CategoriesResponse;

  coordinatesForm: FormGroup;
  form: FormGroup;
  audioguidesForm: FormGroup;
  descriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private poiService: PoiService, private categoryService: CategoryService,
    public router: Router, public snackBar: MatSnackBar, private afStorage: AngularFireStorage, private titleService: Title) { }

  ngOnInit() {
    this.createForm();
    this.getCategories();
    this.titleService.setTitle('Create - POI');
  }

  getCategories() {
    this.categoryService.getAllCategories()
      .subscribe(r => this.allCategories = r);
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
      categories: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      schedule: [null, Validators.compose([Validators.required])],
      price: [null],
    });
  }

  onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    newPoi.coordinates = this.coordinatesForm.value;
    newPoi.audioguides = this.audioguidesForm.value;
    newPoi.description = this.descriptionForm.value;


    this.poiService.create(newPoi).subscribe(() => {
      this.router.navigate(['/home']);
    }, error => {
      this.snackBar.open('Error creating the POI.', 'Close', { duration: 3000 });
    });
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
    const filePath = `audioguides/${id}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => ref.getDownloadURL().subscribe(r => this.audioguidesForm.controls['originalFile'].setValue(r)))).subscribe();
  }

  removeImage(i) {
    this.urlImage.splice(this.urlImage.indexOf(i), 1);
  }

}
