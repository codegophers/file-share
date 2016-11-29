import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import {FeedsService} from '../feeds.service';
import { Feed } from '../models';
import {UserService} from '../user.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent {
  feeds: Observable<Feed[]>;
  constructor(fs: FeedsService, private user: UserService) {
    this.feeds = fs.feeds;
  }
}
