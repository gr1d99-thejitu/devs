import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DeveloperResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  constructor(private http: HttpClient) {}

  endpoint = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  fetchDevelopers(): Observable<[DeveloperResponse[], number]> {
    const url = `${this.endpoint}/developers`;

    return this.http.get<[DeveloperResponse[], number]>(url);
  }
}
