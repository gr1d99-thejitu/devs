import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import {
  LoginResponse,
  NewUserFormValue,
  User,
  UserCredentials,
} from '../types';
import localForage from 'localforage';
import { Router } from '@angular/router';
import { ApiErrorService } from './api-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = new Subject<boolean>();
  endpoint = environment.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient,
    private router: Router,
    public errorService: ApiErrorService
  ) {}

  checkAuthentication(): Observable<boolean> {
    return new Observable<boolean>((observable) => {
      localForage
        .getItem(environment.authCredentialsKey)
        .then((value) => {
          if (value === null || value === undefined) {
            observable.next(false);
            this.isAuthenticated.next(false);
          } else {
            observable.next(true);
            this.isAuthenticated.next(true);
          }
        })
        .catch(() => {
          observable.next(false);
          this.isAuthenticated.next(false);
        });
    });
  }

  getAuthToken(): Promise<LoginResponse | null> {
    return localForage.getItem(environment.authCredentialsKey);
  }

  register(user: NewUserFormValue) {
    const api = `${this.endpoint}/users`;

    this.http
      .post(api, user)
      .pipe(catchError(this.errorService.handleError))
      .subscribe(() => {
        return this.router.navigate(['/login']);
      });
  }

  login(credentials: UserCredentials): void {
    const api = `${this.endpoint}/auth/login`;

    this.http
      .post<LoginResponse>(api, credentials)
      .pipe(catchError(this.errorService.handleError))
      .subscribe((res) => {
        void localForage.setItem(environment.authCredentialsKey, res, (err) => {
          if (err) {
            this.isAuthenticated.next(false);
            return;
          }

          this.isAuthenticated.next(true);
          void this.router.navigate(['/']);
        });
      });
  }

  logout(): void {
    localForage
      .removeItem(environment.authCredentialsKey)
      .then(() => {
        this.isAuthenticated.next(false);
      })
      .catch(() => {
        this.checkAuthentication().subscribe((prevResult) => {
          this.isAuthenticated.next(prevResult);
        });
      });
  }
}
