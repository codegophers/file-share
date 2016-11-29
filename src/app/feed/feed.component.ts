import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import {FeedsService} from '../feeds.service';
import {Feed} from '../models';
import {UserService} from '../user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  selected: Observable<boolean>;

  @Input() feed: Feed;
  constructor(public fs: FeedsService, private user: UserService) {}

  ngOnInit() {
    this.selected = this.fs.selectedID.map(id => id === this.feed.id);
  }

  select() {
    this.fs.select(this.feed.id);
  }

  remove() {
    this.fs.remove(this.feed.id);
  }

  rename(el: any) {
    const newName = el.innerText;
    if (newName !== this.feed.name) {
      this.fs.rename(this.feed.id, newName);
    }
  }
}
