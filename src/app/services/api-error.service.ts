import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorService {
  handleError(error: HttpErrorResponse) {
    let errorMsg = '';

    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    }

    errorMsg = error.message;

    return throwError(() => errorMsg);
  }
}
