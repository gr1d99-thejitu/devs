import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_, __) => {
  const service = inject(AuthService);

  return service.checkAuthentication();
};
