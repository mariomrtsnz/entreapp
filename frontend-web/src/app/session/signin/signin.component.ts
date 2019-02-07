import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginDto } from '../../dto/login-dto';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar,
    private authService: AuthenticationService, private ngZone: NgZone) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    const loginDto: LoginDto = this.form.value;
    this.authService.login(loginDto).subscribe(loginResp => {
      this.authService.setLoginData(loginResp);
      this.router.navigate(['/home']);
    }, error => {
      this.snackBar.open('There was an error when we were trying to login.', 'Close', {
        duration: 3000
      });
    }
    );
  }

  doGoogleLogin() {
    this.authService.googleLogin().then(r => r.subscribe(res => {
      this.authService.setLoginData(res);
      this.ngZone.run(() => this.router.navigate(['/home'])).then();
    }));
  }

  doFacebookLogin() {
    this.authService.facebookLogin().then(r => r.subscribe(res => {
      this.authService.setLoginData(res);
      this.ngZone.run(() => this.router.navigate(['/home'])).then();
    }));
  }

}
