import { BodyParamErrorResponse, ErrorResponse, GotExpectedBodyParamErrorResponse } from './request-param-errors';
import { UserInfoResponse } from './user-info.EXAMPLE';

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthStatusResponse {
  isAuthenticated: boolean;
  user?: {
    id: string;
    displayName: string;
    email: string;
  };
}

export type AuthLoginResponse =
  | UserInfoResponse
  | ErrorResponse
  | BodyParamErrorResponse
  | GotExpectedBodyParamErrorResponse;

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
  
