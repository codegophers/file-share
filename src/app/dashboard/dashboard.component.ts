import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { FeedsService } from '../feeds.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private fs: FeedsService, private af: AngularFire, private user: UserService) {}

  logOut() {
    this.af.auth.logout();
  }
}
