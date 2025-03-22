export interface AuthStatusResponse {
  isAuthenticated: boolean;
  user?: {
    id: string;
    displayName: string;
    email: string;
  };
}

export interface MicrosoftUserProfile {
  id: string;
  displayName: string;
  _json: {
    mail?: string;
    userPrincipalName?: string;
    tid?: string; // Tenant ID
  };
}
  
declare global {
  namespace Express {
    interface User extends MicrosoftUserProfile {}
  }
}
  
