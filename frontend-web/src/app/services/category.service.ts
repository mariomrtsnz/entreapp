import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CategoryCreateDto } from '../dto/create-category.dto';
import { Category } from '../interfaces/category';
import { AuthenticationService } from './authentication.service';

const categoryUrl = `${environment.apiUrl}/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllCategories(): Observable<Category[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    return this.http.get<Category[]>(`${categoryUrl}`, requestOptions);
  }

  createCategory(categoryCreateDto: CategoryCreateDto): Observable<Category> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    return this.http.post<Category>(`${categoryUrl}/create`, categoryCreateDto, requestOptions);
  }

  updateCategory(category: Category): Observable<Category> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.http.put<Category>(`${categoryUrl}/${category.id}`, category, requestOptions);
  }

  deleteCategory(id: number): Observable<Category> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete<Category>(`${categoryUrl}/${id}`, requestOptions);
  }
}
