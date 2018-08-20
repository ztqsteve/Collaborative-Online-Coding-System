import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AUTH_CONFIG } from '../../services/auth-variables';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile : any;

  constructor(public auth: AuthService, private http: Http) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

  }

  resetPassword(): void {
    let url: string = `https://${AUTH_CONFIG.domain}/dbconnections/change_password`;
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = {
      client_id: AUTH_CONFIG.clientID,
      email: this.profile.name,
      connection: 'Username-Password-Authentication'
    };

    this.http.post(url, body, options)
      .toPromise()
      .then((res: Response) => {
        console.log(res.text());
      })
      .catch(this.auth.handleError)
  }
}
