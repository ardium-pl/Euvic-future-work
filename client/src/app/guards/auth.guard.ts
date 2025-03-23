import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { tap } from 'rxjs';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return toObservable(authService.isLoggedIn).pipe(tap({ next: v => !v && router.navigateByUrl('auth/login') }));
  };
};
