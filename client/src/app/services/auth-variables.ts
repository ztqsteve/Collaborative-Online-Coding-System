interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'upc26m3obmO4auMYGs-uq3MbiEbXCdiN',
  domain: 'tianqizhang.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
