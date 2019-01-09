import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
const authUrl = `${environment.apiUrl}`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authUrl}/auth/login`, loginDto, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('name', loginResponse.name);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('role', loginResponse.role);
    localStorage.setItem('id', loginResponse.id);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getName(): string {
    return localStorage.getItem('name');
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
