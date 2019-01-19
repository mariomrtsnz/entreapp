import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../interfaces/user-response';
import { UsersResponse } from '../interfaces/users-response';
import { UserCreateDto } from '../dto/create-user.dto';
import { Roles } from '../interfaces/roles';
import { CountryResponse } from '../interfaces/country-response';
import { UserUpdateDto } from '../dto/update-user.dto';
import { UserUpdateMyProfileDto } from '../dto/user-update-my-profile.dto';

const userUrl = `${environment.apiUrl}/users`;
const countryUrlApi = 'https://restcountries.eu/rest/v2/all?fields=name;';
const masterKey = '?access_token=WYGSKxg0IwVvtZAWjDtVAWfWcbnugIbX';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // token = `?access_token=${this.authService.getToken()}`;
  // tslint:disable-next-line:max-line-length
  token = `?access_token=${this.authService.getToken()}`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  /*getAll() {
    this.poiService.getAll().toPromise()
    .then(receivedPois => {
      this.POIs = receivedPois;
    })
    .catch(() => this.snackBar.open('There was an error when we were loading data.', 'Close', {duration: 3000}));
  }*/
  getAll(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${userUrl}${this.token}`);
  }

  getOne(id: String): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${userUrl}/${id}${this.token}`);
  }

  getMe(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${userUrl}/me${this.token}`);
  }
  getRoles(): Observable<Roles> {
    return this.http.get<Roles>(`${userUrl}/roles${this.token}`);
  }
  getAllCountries(): Observable<CountryResponse[]> {
    return this.http.get<CountryResponse[]>(countryUrlApi);
  }
  getAllUsers(): Observable<any[]>  {
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
  remove(id: string): Observable<UserResponse[]> {
    return this.http.delete<UserResponse[]>(`${userUrl}/${id}${this.token}`);
  }
  create(resource: UserCreateDto): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${userUrl}${masterKey}`, resource);
  }
  edit(id: string, resource: UserUpdateDto): Observable<UserResponse> {
    console.log(id);
    console.log(UserUpdateDto);
    return this.http.put<UserResponse>(`${userUrl}/editRole/${id}${this.token}`, resource);
  }
  editMyProfile(user: UserResponse, id: string): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${userUrl}/${id}${this.token}`, user);
  }

  // updateUsuario(usuario: Usuario): Observable<Usuario> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.authService.getToken()}`
  //     })
  //   };
  //   return this.http.put<Usuario>(`${usuarioUrl}/${usuario.id}`, usuario, requestOptions);
  // }

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

  // getOneByEmail(email: string): any {
  //   let foundUser;
  //   this.getAllUsers().toPromise().then(
  //     users => {
  //       foundUser = users.find(user => {
  //         return user.email.toLowerCase() === email.toLowerCase();
  //       });
  //     }
  //   );
  //   return foundUser;
  // }
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
