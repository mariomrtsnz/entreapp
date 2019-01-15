import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PoiCreateDto } from 'src/app/dto/poi-create-dto';
import { Category } from 'src/app/interfaces/category';
import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiService } from 'src/app/services/poi.service';
import { FileUploader } from 'ng2-file-upload';


const URL = 'http://localhost:9000/uploads';

@Component({
  selector: 'app-poi-create',
  templateUrl: './poi-create.component.html',
  styleUrls: ['./poi-create.component.scss']
})
export class PoiCreateComponent implements OnInit {

  poi: OnePoiResponse;
  categories: Category;
  public coordinatesForm: FormGroup;
  public form: FormGroup;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder, private poiService: PoiService,
    public router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.createForm();
  }

  createForm() {
    this.coordinatesForm = this.fb.group({
      lat: [null, Validators.compose([Validators.required])],
      lng: [null, Validators.compose([Validators.required])]
    });
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])],
      creator: [null],
      description: [null, Validators.compose([Validators.required])],
      images: [null, Validators.compose([Validators.required])],
      categories: [null, Validators.compose([Validators.required])],
      audioguides: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      schedule: [null, Validators.compose([Validators.required])],
      price: [null],
    });
  }

  onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    newPoi.coordinates = this.coordinatesForm.value;
    this.poiService.create(newPoi).toPromise()
      .then(() => this.router.navigate(['/home']))
      .catch(() => this.snackBar.open('Error al crear localización.', 'Cerrar', { duration: 3000 }));
  }

}
