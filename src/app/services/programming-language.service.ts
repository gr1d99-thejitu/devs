import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProgrammingLanguage } from '../types';
import { catchError } from 'rxjs';
import { ApiErrorService } from './api-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguageService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public errorService: ApiErrorService) {}

  fetchProgrammingLanguages() {
    const url = environment.apiUrl + '/programming-languages';
    return this.http
      .get<[ProgrammingLanguage[], number]>(url)
      .pipe(catchError(this.errorService.handleError));
  }
}
