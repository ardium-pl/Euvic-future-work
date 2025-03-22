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
  
