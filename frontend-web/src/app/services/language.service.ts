import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageResponse } from '../interfaces/language-response';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';


const languageUrl = `${environment.apiUrl}/languages`;
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  constructor(private http: HttpClient) { }

  getUserLanguage(id: String, token: String): Observable<LanguageResponse> {
    return this.http.get<LanguageResponse>(`${languageUrl}/${id}?access_token=${token}`);
  }
}
