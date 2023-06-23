import { Injectable } from '@angular/core';
import { ApiErrorService } from './api-error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public errorService: ApiErrorService, private http: HttpClient) {}

  fetchUsers() {
    const url = environment.apiUrl + '/users';
    return this.http
      .get<[User[], number]>(url)
      .pipe(catchError(this.errorService.handleError));
  }
}
