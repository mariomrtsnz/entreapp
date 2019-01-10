import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PoiResponse } from '../interfaces/poi-response';
import { PoiCreateDto } from '../dto/poi-create-dto';

const url = `${environment.apiUrl}/pois`;

@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${this.authService.getToken()}`
    })
  };


  getAll(): Observable<PoiResponse[]> {
    return this.http.get<PoiResponse[]>(`${url}`, this.requestOptions);
  }

  create(resource: PoiCreateDto): Observable<PoiResponse> {
    return this.http.post<PoiResponse>(`${url}`, resource, this.requestOptions);
  }

  remove(id: string): Observable<PoiResponse[]> {
    return this.http.delete<PoiResponse[]>(`${url}/${id}`, this.requestOptions);
  }

  edit(id: string, resource: PoiCreateDto): Observable<PoiResponse> {
    return this.http.put<PoiResponse>(`${url}/${id}`, resource, this.requestOptions);
  }

}
