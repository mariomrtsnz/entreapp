import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../dto/login-dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [null , Validators.compose ( [ Validators.required ] )],
      password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    const loginDto = new LoginDto(this.form.controls['email'].value, this.form.controls['password'].value);
    this.authService.login(loginDto).subscribe(loginResp => {
      console.log(loginResp);
      this.authService.setLoginData(loginResp);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log('Error en petición de login');
      this.router.navigate(['/error']);
    }
    );
  }

}
