import { effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatusResponse, AuthUserInfo } from '@shared/auth';
import { HttpService, SecureHttpService } from './http.service';

export class AuthService {
  private readonly _http = inject(HttpService);
  private readonly _secureHttp = inject(SecureHttpService);
  private readonly _router = inject(Router);

  private readonly _isLoggedIn = signal<boolean | null>(null);
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();

  private readonly _userData = signal<AuthUserInfo | null>(null);
  public readonly userData = this._userData.asReadonly();

  constructor() {
    this.refreshAuthStatus();

    effect(() => {
      if (this.isLoggedIn() === true) {
        this._router.navigateByUrl('_recruiter');
      } else if (this.isLoggedIn() === false) {
        this._router.navigateByUrl('auth/login');
      }
    });
  }

  /**
   * Refreshes the authentication status by calling the server.
   */
  refreshAuthStatus(): void {
    this._secureHttp.get<AuthStatusResponse>('/auth/status').subscribe({
      next: response => {
        this._isLoggedIn.set(response.isAuthenticated);

        if (response.isAuthenticated) {
          this._userData.set(response.user);
        } else {
          this._userData.set(null);
        }
      },
      error: error => {
        console.error('Failed to fetch auth status:', error);
        this._isLoggedIn.set(false);
      },
    });
  }

  /**
   * Sends a logout request to the server.
   */
  logout() {
    this._http.post('/auth/logout', null).subscribe({
      next: () => {
        this._isLoggedIn.set(false);
        this._userData.set(null);
      },
      error: error => {
        console.error('Logout failed:', error);
      },
    });
  }

  private readonly _isLoginLoading = signal<boolean>(false);
  public readonly isLoginLoading = this._isLoginLoading.asReadonly();

  /**
   * Sends a login request to the server.
   */
  login() {
    this._isLoginLoading.set(true);

    window.location.href = this._secureHttp.apiUrl + 'auth/login';
  }
}
