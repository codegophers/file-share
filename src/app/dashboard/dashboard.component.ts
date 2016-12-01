import { Component } from '@angular/core';

import { FeedsService } from '../feeds.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private fs: FeedsService, private auth: AuthService, private user: UserService) {}

  logOut() {
    this.auth.logout();
  }
}
