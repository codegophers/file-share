import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Feed } from './models';

@Injectable()
export class FeedsService {
  feeds: Observable<Feed[]>;
  selectedID = new BehaviorSubject<string | null>(null);

  private afFeeds: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
    this.afFeeds =  af.database.list('/feeds');
    this.feeds = this.afFeeds.map(
      feeds => feeds.map(({$key, $value}) => ({id: $key, name: $value}))
    );

    // select first feed if no feed is currently selected
    // (happens on init or if we delete the selected feed)
    Observable.combineLatest(this.selectedID, this.feeds)
      .subscribe(([selectedKey, feeds]) => {
        const [firstFeed, ] = feeds;
        if (firstFeed && !selectedKey) {
          this.select(firstFeed.id);
        }
      });
  }

  add(name: string) {
    this.afFeeds.push(name);
  }

  remove(id: string) {
    this.afFeeds.remove(id);
    if (this.selectedID.value === id) {
      this.selectedID.next(null);
    }
  }

  rename(id: string, name) {
    // must use ref because can't update object
    this.afFeeds.$ref.ref.child(id).set(name);
  }

  select(id: string) {
    if (id !== this.selectedID.value) {
      this.selectedID.next(id);
    }
  }
}
