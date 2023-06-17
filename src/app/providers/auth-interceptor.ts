import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { from, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.fromService(req, next));
  }

  async fromService(req: HttpRequest<any>, next: HttpHandler) {
    try {
      const authTokens = await this.authService.getAuthToken();
      if (authTokens === null) {
        return await lastValueFrom(next.handle(req));
      }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authTokens.access_token}`,
        },
      });

      return lastValueFrom(next.handle(req));
    } catch (e) {
      return lastValueFrom(next.handle(req));
    }
  }
}
