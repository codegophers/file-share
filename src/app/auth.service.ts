import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { StorageSync } from 'angular2-storage-sync';


// Wraps af.auth methods in order to store user data
// Makes sure that users stay in for 24 hours, by either
// logging out a user if they have been logged in for longer than that
// or logging them in again if they are logged out before that.
@Injectable()
export class AuthService {
  @StorageSync() private email: string | null = null;
  @StorageSync() private password: string | null = null;
  @StorageSync() private loginDate: number | null = null;
  @StorageSync() private hasLiked: string[] = [];


  constructor(private af: AngularFire) {
    af.auth.first().subscribe(auth => {
      const loggedIn = !!auth;
      if (this.pastOneDay) {
        if (loggedIn) {
          this.logout();
        } else {
          this.clearData();
        }
      }
      if (!loggedIn && !this.pastOneDay && this.email) {
        this.relogin();
      }
    });
  }

  private get pastOneDay() {
    if (!this.loginDate) {
      return false;
    }
    const elapsedMS = Date.now() - this.loginDate;
    const MSPerDay = 86400000;
    return elapsedMS > MSPerDay;
  }

  private relogin() {
    this.af.auth.login({email: this.email, password: this.password});
  }

  login(email: string, password: string) {
    return this.af.auth.login({email, password}).then(_ => {
      this.email = email;
      this.password = password;
      this.loginDate = Date.now();
    });
  }

  private clearData() {
    this.email = null;
    this.password = null;
    this.loginDate = null;
    this.hasLiked = [];
  }

  hasLikedFile(id: string) {
    return this.hasLiked.indexOf(id) !== -1;
  }

  likeFile(id: string) {
    console.log(id, this.hasLiked);
    if (!this.hasLikedFile(id)) {
      this.hasLiked = this.hasLiked.concat([id]);
    }
  }

  logout() {
    this.clearData();
    return this.af.auth.logout();
  }
}
