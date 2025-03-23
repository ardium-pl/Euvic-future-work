import { inject, Injectable, signal } from '@angular/core';
import { AuthStatusResponse, AuthUserInfo } from '@shared/auth';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _http = inject(HttpService);

  private readonly _isLoggedIn = signal<boolean>(false);
  public readonly isLoggedIn = this._isLoggedIn.asReadonly();

  private readonly _userData = signal<AuthUserInfo | null>(null);
  public readonly userData = this._userData.asReadonly();

  constructor() {
    this.refreshAuthStatus();
  }

  /**
   * Refreshes the authentication status by calling the server.
   */
  refreshAuthStatus(): void {
    this._http.get<AuthStatusResponse>('/auth/status').subscribe({
      next: response => {
        this._isLoggedIn.set(response.isAuthenticated);
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

    window.location.href = this._http.apiUrl + 'auth/login';
  }
}
