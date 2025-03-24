export interface AuthUserInfo {
  id: string;
  displayName: string;
  email: string;
  photo: string | undefined;
}

export type AuthStatusResponse =
  | {
      isAuthenticated: true;
      user: AuthUserInfo;
    }
  | {
      isAuthenticated: false;
    };
