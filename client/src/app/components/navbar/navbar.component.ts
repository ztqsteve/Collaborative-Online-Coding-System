import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Collaborative Online Judge System";

  // username = "";
  public profile: any;

  searchBox : FormControl = new FormControl();
  subscription: Subscription;
  constructor(@Inject('auth') public auth, @Inject('input') private input,
              private router: Router) {

  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

    this.subscription = this.searchBox
                            .valueChanges
                            .pipe(debounceTime(200))
                            .subscribe(
                              term => {
                                this.input.changeInput(term);
                              }
                            );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem(): void {
    this.router.navigate(['/']);
  }

}
