import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
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

  constructor() { }

  getAllBadges() {

  }

  getOneBadge(id: number) {

  }


}
