import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PoiCreateDto } from '../dto/poi-create-dto';
import { PoiResponse } from '../interfaces/poi-response';
import { AuthService } from './auth.service';

const url = `${environment.apiUrl}/pois`;

@Injectable({
  providedIn: 'root'
})
export class PoiService {

  token = `?access_token=${this.authService.getToken()}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<PoiResponse> {
    return this.http.get<PoiResponse>(`${url}${this.token}`);
  }

  create(resource: PoiCreateDto): Observable<PoiResponse> {
    return this.http.post<PoiResponse>(`${url}${this.token}`, resource);
  }

  remove(id: string): Observable<PoiResponse[]> {
    return this.http.delete<PoiResponse[]>(`${url}/${id}${this.token}`);
  }

  edit(id: string, resource: PoiCreateDto): Observable<PoiResponse> {
    return this.http.put<PoiResponse>(`${url}/${id}${this.token}`, resource);
  }

}
