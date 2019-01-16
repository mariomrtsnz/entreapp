import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
const authUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  request(email: String, password: String) {
    let emailPass: String;
    emailPass = btoa(email + ':' + password);
    const requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${emailPass}`
    })
  };

    return requestOptions;
  }

  constructor(private http: HttpClient) { }
  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = this.request(loginDto.email, loginDto.password);
    return this.http.post<LoginResponse>(`${authUrl}/auth`, environment.masterKey, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('name', loginResponse.name);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('role', loginResponse.role);
    localStorage.setItem('id', loginResponse.id);
    localStorage.setItem('createAt', loginResponse.createAt);
  }
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
  generateNewPassword(): string {
    const tamanioPassword = 10;
    const passwordGenerada = this.randomPassword(tamanioPassword);
    const passGenerada = passwordGenerada;
    return passGenerada;
  }
  logout() {
    localStorage.clear();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getName(): string {
    return localStorage.getItem('name');
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  getPicture(): string {
    return localStorage.getItem('picture');
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  googleLogin() {
    return true;
  }

  googleLogout() {
    return false;
  }

  facebookLogin() {
    return true;
  }
}
