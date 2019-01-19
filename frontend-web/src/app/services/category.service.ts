import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CategoryCreateDto } from '../dto/create-category.dto';
import { Category } from '../interfaces/category';
import { AuthenticationService } from './authentication.service';
import { CategoriesComponent } from '../dashboard/categories/categories.component';
import { CategoriesResponse } from '../interfaces/categories-response';

const categoryUrl = `${environment.apiUrl}/categories`;
const masterKey = '?access_token=WYGSKxg0IwVvtZAWjDtVAWfWcbnugIbX';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  token = `?access_token=${this.authService.getToken()}`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllCategories(): Observable<CategoriesResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.get<CategoriesResponse>(`${categoryUrl}`, requestOptions);
  }

  createCategory(categoryCreateDto: CategoryCreateDto): Observable<Category> {

    return this.http.post<Category>(`${categoryUrl}${this.token}`, categoryCreateDto);
  }

  updateCategory(category: Category): Observable<Category> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this.http.put<Category>(`${categoryUrl}/${category.id}`, category, requestOptions);
  }

  deleteCategory(id: number): Observable<Category> {

    return this.http.delete<Category>(`${categoryUrl}/${id}${this.token}`);
  }
}
