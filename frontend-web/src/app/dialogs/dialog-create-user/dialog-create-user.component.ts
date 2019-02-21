import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { UserCreateDto } from 'src/app/dto/create-user.dto';
import { CountryResponse } from 'src/app/interfaces/country-response';
import { LanguagesResponse } from 'src/app/interfaces/languages-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';

import { UserResponse } from '../../interfaces/user-response';
import { UserService } from '../../services/user.service';

const password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)]));

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
  languages: LanguagesResponse;
  constructor(public languageService: LanguageService, private fb: FormBuilder, private userService: UserService,
    public dialogRef: MatDialogRef<DialogCreateUserComponent>, public snackBar: MatSnackBar, public authService: AuthenticationService) { }

  ngOnInit() {
    //it obtains all roles, citys and languages
    this.getAllLanguages();
    this.createForm();
    this.obtainRoles();
    this.getAllCountries();
    // this.getData();
  }
  //method to generate random password
  generateNewPassword() {
    this.passGenerada = this.authService.generateNewPassword();
    this.passGeneradaDos = this.passGenerada;
  }

  randomPassword(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
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
  //it creates form with validatores
  createForm() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: password,
      confirmPassword: confirmPassword,
      name: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      language: [null, Validators.compose([Validators.required])],

    });
  }
  //get all cities from api
  getAllCountries() {
    this.userService.getAllCountries().subscribe(receivedCountries => {
      this.countries = receivedCountries;
    }, error => {
      this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 });
    });
  }
  //get all languages from api
  getAllLanguages() {
    this.languageService.getAllLanguages(this.authService.getToken()).subscribe(receivedLanguages => {
      this.languages = receivedLanguages;
    }, error => {
      this.snackBar.open('There was an error when we were loading data.', 'Close', { duration: 3000 });
    });
  }
  //create a new user with a default gravatar
  onSubmit() {
    const newUser: UserCreateDto = <UserCreateDto>this.form.value;
    newUser.picture = 'https://gravatar.com/avatar/801fce29ee6b494ec10dc47af131b1ba?d=identicon';
    this.userService.create(newUser).subscribe(resp => {
      this.dialogRef.close(resp);
    }, error => this.snackBar.open('There was an error when trying to create this user.', 'Close', { duration: 3000 }));
  }
  //obtain all roles from api
  obtainRoles() {
    this.userService.getRoles().subscribe(receivedRoles => {
      this.roles = receivedRoles.roles;
    }, error => this.snackBar.open('There was an error when were loading data.', 'Close', { duration: 3000 }));
  }
  

}
