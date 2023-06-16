import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    const api = `${this.endpoint}/users`;

    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = error.message;
    }

    return throwError(() => msg);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(environment.authTokenKey);
  }
}
