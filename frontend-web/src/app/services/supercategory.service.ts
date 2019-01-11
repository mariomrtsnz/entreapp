import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supercategory } from '../interfaces/supercategory';
import { CreateSuperCategoryDto } from '../dto/create-supercategory.dto';

const superCategoryUrl = `${environment.apiUrl}/supercategoria`;
@Injectable({
  providedIn: 'root'
})
export class SupercategoryService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllSuperCategories(): Observable<Supercategory[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    return this.http.get<Supercategory[]>(`${superCategoryUrl}/all`, requestOptions);
  }

  createSuperCategory(SuperCategoriaCreateDto: CreateSuperCategoryDto): Observable<Supercategory> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    return this.http.post<Supercategory>(`${superCategoryUrl}/create`, SuperCategoriaCreateDto, requestOptions);
  }

  updateSuperCategory(superCategory: Supercategory): Observable<Supercategory> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.put<Supercategory>(`${superCategoryUrl}/edit/${superCategory.id}`, superCategory, requestOptions);
  }
  deleteSuperCategory(id: number): Observable<Supercategory> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete<Supercategory>(`${superCategoryUrl}/${id}`, requestOptions);
  }
}
