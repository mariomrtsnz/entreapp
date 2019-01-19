import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../interfaces/user-response';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserCreateDto } from 'src/app/dto/create-user.dto';
import { Roles } from 'src/app/interfaces/roles';
import { CountryResponse } from 'src/app/interfaces/country-response';
import { CustomValidators } from 'ng2-validation';
// import { AuthService } from 'angular-6-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';

const password = new FormControl('', Validators.required);

const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

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
  hide = true;
  passGenerada = '';
  passGeneradaDos = '';
  hideDos = true;
  type = 'password';
  roles: string[];
  constructor(private fb: FormBuilder, private userService: UserService,
    public dialogRef: MatDialogRef<DialogCreateUserComponent>, public snackBar: MatSnackBar, public authService: AuthenticationService) { }

  ngOnInit() {
    this.createForm();
    this.obtainRoles();
    this.getAllCountries();
    // this.getData();
  }
  generateNewPassword () {
  this.passGenerada = this.authService.generateNewPassword();
  this.passGeneradaDos = this.passGenerada;
  }
  /*email: String;
          password: String;
          name: String;
          role: String;
          picture: String;
          city: String;
          language: String;*/
  randomPassword(length) {
    // tslint:disable-next-line:prefer-const
    let chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    let pass = '';
    for (let x = 0; x < length; x++) {
      const i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  generate() {
    const tamanioPassword = 10;
    const passwordGenerada = this.randomPassword(tamanioPassword);
    this.passGenerada = passwordGenerada;
    this.passGeneradaDos = passwordGenerada;
    this.type = 'password';


  }
  createForm() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: password,
      confirmPassword: confirmPassword,
      name: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      language: [null, Validators.compose([Validators.required])],
      picture: [null, Validators.compose([Validators.required])],

    });
  }

  getAllCountries() {
    this.userService.getAllCountries().toPromise()
      .then(receivedCountries => {
        this.countries = receivedCountries;
      })
      .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 }));
  }
  onSubmit() {
    const newUser: UserCreateDto = <UserCreateDto>this.form.value;
    newUser.picture = 'https://gravatar.com/avatar/801fce29ee6b494ec10dc47af131b1ba?d=identicon';
    console.log(newUser);
    this.userService.create(newUser).toPromise()
      .then(resp => {
        console.log('aqui');
        console.log(resp);
        this.dialogRef.close(resp);
      })
      .catch(() => this.snackBar.open('Error creating user.', 'Cerrar', { duration: 3000 }));
  }
  obtainRoles() {
    this.userService.getRoles().toPromise()
      .then(receivedRoles => {
        this.roles = receivedRoles.roles;
      })
      .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 }));
  }
  /*onSubmit() {
    const newPoi: PoiCreateDto = <PoiCreateDto>this.form.value;
    newPoi.coordinates = this.coordinatesForm.value;
    this.poiService.create(newPoi).toPromise()
    .then(() => this.router.navigate(['/home']))
    .catch(() => this.snackBar.open('Error al crear localización.', 'Cerrar', {duration: 3000}));
  }*/

}
