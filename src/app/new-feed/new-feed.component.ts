import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import {FeedsService} from '../feeds.service';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})
export class NewFeedComponent {
  nameControl = new FormControl();

  constructor(public fs: FeedsService) {}

  add() {
    this.fs.add(this.nameControl.value);
    this.nameControl.reset();
  }
}
