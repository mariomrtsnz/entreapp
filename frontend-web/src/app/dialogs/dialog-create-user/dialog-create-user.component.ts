import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../interfaces/user-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserCreateDto } from 'src/app/dto/create-user.dto';
import { Roles } from 'src/app/interfaces/roles';
import { CountryResponse } from 'src/app/interfaces/country-response';

@Component({
  selector: 'app-dialog-create-user',
  templateUrl: './dialog-create-user.component.html',
  styleUrls: ['./dialog-create-user.component.scss']
})
export class DialogCreateUserComponent implements OnInit {
  countries: CountryResponse[];
  USER: UserResponse;
  roleSelected;
  countrySelected;
  public form: FormGroup;
  roles: string[];
  constructor(private fb: FormBuilder, private userService: UserService,
    public dialogRef: MatDialogRef<DialogCreateUserComponent>, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.obtainRoles();
    this.getAllCountries();
    // this.getData();
  }
/*email: String;
        password: String;
        name: String;
        role: String;
        picture: String;
        city: String;
        language: String;*/
  createForm() {
    this.form = this.fb.group ( {
      email: [null, Validators.compose ([ Validators.required, Validators.email ])],
      name: [null, Validators.compose ([ Validators.required ])],
      role: [null, Validators.compose ([ Validators.required ])],
      country: [null, Validators.compose ([ Validators.required ])],
      languaje: [null, Validators.compose ([ Validators.required ])],
      picture: [null, Validators.compose ([ Validators.required ])],

    } );
  }

  getAllCountries() {
    this.userService.getAllCountries().toPromise()
    .then(receivedCountries => {
      this.countries = receivedCountries;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }
  onSubmit() {
    const newUser: UserCreateDto = <UserCreateDto>this.form.value;
    newUser.picture = 'prueba';
    console.log(newUser);
    this.userService.create(newUser).toPromise()
    .then(resp => {
      console.log('aqui');
      console.log(resp);
      this.dialogRef.close(resp);
    })
    .catch(() => this.snackBar.open('Error creating user.', 'Cerrar', {duration: 3000}));
  }
  obtainRoles() {
    this.userService.getRoles().toPromise()
    .then(receivedRoles => {
      this.roles = receivedRoles.roles;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }
  /*onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    newPoi.coordinates = this.coordinatesForm.value;
    this.poiService.create(newPoi).toPromise()
    .then(() => this.router.navigate(['/home']))
    .catch(() => this.snackBar.open('Error al crear localización.', 'Cerrar', {duration: 3000}));
  }*/

}
