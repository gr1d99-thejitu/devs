import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User, UserCredentials } from '../types';
import localForage from 'localforage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) {}

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
    return localStorage.getItem(environment.authCredentialsKey);
  }

  register(user: User): Observable<any> {
    const api = `${this.endpoint}/users`;

    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  login(credentials: UserCredentials): void {
    const api = `${this.endpoint}/auth/login`;

    this.http
      .post<{ access_token: string; refresh_token: string }>(api, credentials)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        void localForage.setItem(
          environment.authCredentialsKey,
          JSON.stringify(res),
          (err) => {
            if (err) {
              return;
            }

            void this.router.navigate(['/']);
          }
        );
      });
  }
}
