import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageResponse } from '../interfaces/language-response';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { auth } from 'firebase';
import { LanguagesResponse } from '../interfaces/languages-response';


const languageUrl = `${environment.apiUrl}/languages`;
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  constructor(private http: HttpClient) { }

  getUserLanguage(id: String, token: String): Observable<LanguageResponse> {
    return this.http.get<LanguageResponse>(`${languageUrl}/${id}?access_token=${token}`);
  }
  getAllLanguages(token: String): Observable<LanguagesResponse> {
    return this.http.get<LanguagesResponse>(`${languageUrl}?access_token=${token}`);

  }
}
