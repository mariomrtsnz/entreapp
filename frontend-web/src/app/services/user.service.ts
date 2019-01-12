import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../interfaces/user-response';
import { UsersResponse } from '../interfaces/users-response';

const userUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // token = `?access_token=${this.authService.getToken()}`;
  // tslint:disable-next-line:max-line-length
  token = `?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzc5NGVmNzQ4MWRiMzFmYTNlMTk5MiIsImlhdCI6MTU0NzMwOTgwNCwiZXhwIjoxNTQ3OTE0NjA0fQ.sBI-5FqBiaRmrrz6DqaVbRfVh0dJMMbb86HfWlngLXc`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  /*getAll() {
    this.poiService.getAll().toPromise()
    .then(receivedPois => {
      this.POIs = receivedPois;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }*/
  getAll(): Observable<UsersResponse> {
    console.log('get all service');
    console.log(this.token);
    return this.http.get<UsersResponse>(`${userUrl}${this.token}`);
  }
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
