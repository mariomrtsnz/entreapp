import { BadgeResponse } from './../interfaces/badge-response';
import { BadgeDto } from './../dto/badge.dto';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { OneBadgeResponse } from '../interfaces/one-badge-response';
const badgeUrl = `${environment.apiUrl}/badges`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  token = `?access_token=${this.authService.getToken()}`;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAll() {
    return this.http.get<BadgeResponse>(`${badgeUrl}${this.token}`);
  }

  getOne(id: number) {
    return this.http.get<OneBadgeResponse>(`${badgeUrl}/${id}${this.token}`);
  }

  create(resource: BadgeDto): Observable<OneBadgeResponse> {
    return this.http.post<OneBadgeResponse>(`${badgeUrl}${this.token}`, resource);
  }

  remove(id: string): Observable<BadgeResponse[]> {
    return this.http.delete<BadgeResponse[]>(`${badgeUrl}/${id}${this.token}`);
  }

  edit(id: string, resource: BadgeDto): Observable<OneBadgeResponse> {
    return this.http.put<OneBadgeResponse>(`${badgeUrl}/${id}${this.token}`, resource);
  }

}
