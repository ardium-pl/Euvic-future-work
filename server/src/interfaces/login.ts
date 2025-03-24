export interface MicrosoftUserProfile {
  id: string;
  displayName: string;
  _json: {
    mail?: string;
    userPrincipalName?: string;
    tid?: string; // Tenant ID
  };
  photo?: string;
}
  
declare global {
  namespace Express {
    interface User extends MicrosoftUserProfile {}
  }
}
  
