export interface AuthStatusResponse {
    isAuthenticated: boolean;
    user?: {
      id: string;
      displayName: string;
      email: string;
    };
  }