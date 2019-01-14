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
    let emailPass: String 
    emailPass = btoa(email + ":" + password);
    const requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${emailPass}`
    })
  }

    return requestOptions;
  };

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    let requestOptions = this.request(loginDto.email, loginDto.password);
    return this.http.post<LoginResponse>(`${authUrl}/auth`, loginDto, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('name', loginResponse.name);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('role', loginResponse.role);
    localStorage.setItem('id', loginResponse.id);
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
