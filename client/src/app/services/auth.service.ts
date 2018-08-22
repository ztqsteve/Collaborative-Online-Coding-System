import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth-variables';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  requestedScopes: string = 'openid profile read:users';
  auth0 = new auth0.WebAuth({
    clientID: 'upc26m3obmO4auMYGs-uq3MbiEbXCdiN',
    domain: 'tianqizhang.auth0.com',
    responseType: 'token id_token',
    audience: 'https://tianqizhang.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: this.requestedScopes
  });

  userProfile: any;
  extension_url: string = 'https://tianqizhang.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api'


  constructor(public router: Router, private http: Http) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }



  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);

    })};
  }


  public resetPassword(): void {
    let url: string = `https://${AUTH_CONFIG.domain}/dbconnections/change_password`;
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = {
      client_id: AUTH_CONFIG.clientID,
      email: this.userProfile.name,
      connection: 'Username-Password-Authentication'
    };

    this.http.post(url, body, options)
      .toPromise()
      .then((res: Response) => {
        console.log(res.text());
      })
      .catch(this.handleError)
  }

  //error handler
  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purpose only
    return Promise.reject(error.body || error);
  }

  // getUserRole(): Promise<any> {
  //   let user_id = this.userProfile.sub.split('|')[1]
  //   return this.http.get(`${this.extension_url}/users/${user_id}/roles`)
  //     .toPromise()
  //     .then((res: Response) => res.json())
  //     .catch(this.handleError);
  // }

  }
