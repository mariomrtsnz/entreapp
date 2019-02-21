import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserCreateDto } from '../dto/create-user.dto';
import { UserUpdateDto } from '../dto/update-user.dto';
import { CountryResponse } from '../interfaces/country-response';
import { Roles } from '../interfaces/roles';
import { UserResponse } from '../interfaces/user-response';
import { UsersResponse } from '../interfaces/users-response';
import { environment } from './../../environments/environment';
import { AuthenticationService } from './authentication.service';

const userUrl = `${environment.apiUrl}/users`;
const countryUrlApi = 'https://restcountries.eu/rest/v2/all?fields=name;';
const masterKey = '?access_token=WYGSKxg0IwVvtZAWjDtVAWfWcbnugIbX';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line:max-line-length
  token = `?access_token=${this.authService.getToken()}`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

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
  remove(id: string): Observable<UserResponse[]> {
    return this.http.delete<UserResponse[]>(`${userUrl}/${id}${this.token}`);
  }
  create(resource: UserCreateDto): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${userUrl}${masterKey}`, resource);
  }
  edit(id: string, resource: UserUpdateDto): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${userUrl}/editRole/${id}${this.token}`, resource);
  }
  editMyProfile(user: UserResponse, id: string): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${userUrl}/${id}${this.token}`, user);
  }



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


}
