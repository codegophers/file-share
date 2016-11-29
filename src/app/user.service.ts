import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  admin: Observable<boolean>;

  constructor(af: AngularFire) {
    this.admin = af.auth
      .filter(a => a !== null)
      .switchMap(({uid}) => af.database.object(`admins/${uid}`))
      .map(o => !!o.$value);
  }

}
