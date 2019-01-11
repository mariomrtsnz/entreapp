import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const userUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllUsers(): Observable<any[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Credentials': 'true'
      })
    };

    return this.http.get<any[]>(`${userUrl}/all`, requestOptions);
  }

  // createUser(recurso: UserDto): Observable<UserResponse> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };

  //   return this.http.post<UserResponse>(`${userUrl}/create`, recurso, requestOptions);
  // }

  // editUser(user: UserDto, userId: number): Observable<UserResponse> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };

  //   return this.http.put<UserResponse>(`${userUrl}/${userId}`, user, requestOptions);
  // }

  // updateProfile(profile: UserUpdateDto): Observable<UserResponse> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };

  //   return this.http.put<UserResponse>(`${userUrl}/update/profile`, profile, requestOptions);
  // }

  // updatePassword(passwordDto: UserPasswordDto): Observable<UserResponse> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };

  //   return this.http.put<UserResponse>(`${userUrl}/change/password`, passwordDto, requestOptions);
  // }

  // deleteUser(userId: number): Observable<User[]> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };

  //   return this.http.delete<User[]>(`${userUrl}/${userId}`, requestOptions);
  // }

  getOneByEmail(email: string): any {
    let foundUser;
    this.getAllUsers().subscribe(
      users => {
        foundUser = users.find(user => {
          return user.email.toLowerCase() === email.toLowerCase();
        });
      }
    );
    return foundUser;
  }

  // getOneById(userId: number): Observable<User> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };

  //   return this.http.get<User>(`${userUrl}/${userId}`, requestOptions);
  // }

}
