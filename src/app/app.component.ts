import { Component } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean | null;

  constructor(af: AngularFire) {
    af.auth.subscribe(a => this.loggedIn = !!a);
  }
};
