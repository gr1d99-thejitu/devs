import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ResponseInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, public router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          return event;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            const { status } = error;

            if (status === 401) {
              this.authService.logout();
              this.redirectToLogin(this.router.url);
            }
          }

          return throwError(() => error);
        },
      })
    );
  }

  private redirectToLogin(next = '/') {
    void this.router.navigate(['/login'], { queryParams: { next } });
  }
}
