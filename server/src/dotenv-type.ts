declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: string;
      readonly SERVER_URL: string;
      readonly APP_URL: string;
      readonly SESSION_SECRET: string;
      readonly NODE_ENV: 'development' | 'production';

      readonly TENANT_ID: string;
      readonly CLIENT_ID: string;
      readonly CLIENT_SECRET: string;
      readonly CALLBACK_URL: string;

      readonly DB_USER: string;
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_PASSWORD: string;
      readonly DB_DATABASE: string;
    }
  }
}

export { };

