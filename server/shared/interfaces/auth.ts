export interface AuthUserInfo {
  id: string;
  displayName: string;
  email: string;
}

export type AuthStatusResponse =
  | {
      isAuthenticated: true;
      user: AuthUserInfo;
    }
  | {
      isAuthenticated: false;
    };
