import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CategoryCreateDto } from '../dto/create-category.dto';
import { CategoriesResponse } from '../interfaces/categories-response';
import { Category } from '../interfaces/category';
import { AuthenticationService } from './authentication.service';

const categoryUrl = `${environment.apiUrl}/categories`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  token = `?access_token=${this.authService.getToken()}`;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${categoryUrl}${this.token}`);
  }

  createCategory(categoryCreateDto: CategoryCreateDto): Observable<Category> {
    return this.http.post<Category>(`${categoryUrl}${this.token}`, categoryCreateDto);
  }

  updateCategory(id: string, resource: CategoryCreateDto): Observable<Category> {
    return this.http.put<Category>(`${categoryUrl}/${id}${this.token}`, resource);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${categoryUrl}/${id}${this.token}`);
  }
}
