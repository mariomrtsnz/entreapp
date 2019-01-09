import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { CategoryCreateDto } from '../dto/create-category.dto';

const categoryUrl = `${environment.apiUrl}/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllCategories(): Observable<Category[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };

    return this.http.get<Category[]>(`${categoryUrl}/all`, requestOptions);
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
    return this.http.put<Category>(`${categoryUrl}/edit/${category.id}`, category, requestOptions);
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
