import { BadgeDto } from './../dto/badge.dto';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Badge } from '../interfaces/badge';
const badgeUrl = `${environment.apiUrl}/badge`;

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

  getAllBadges() {
    return this.http.get<Badge>(`${badgeUrl}${this.token}`);
  }

  getOneBadge(id: number) {
    return this.http.get<Badge>(`${badgeUrl}/${id}${this.token}`);
  }

  create(resource: BadgeDto): Observable<Badge> {
    return this.http.post<Badge>(`${badgeUrl}${this.token}`, resource);
  }

  remove(id: string): Observable<Badge[]> {
    return this.http.delete<Badge[]>(`${badgeUrl}/${id}${this.token}`);
  }

  edit(id: string, resource: BadgeDto): Observable<Badge> {
    return this.http.put<Badge>(`${badgeUrl}/${id}${this.token}`, resource);
  }


}
