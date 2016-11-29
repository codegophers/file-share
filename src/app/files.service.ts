import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

import { File as File_ } from './models';
import { FeedsService } from './feeds.service';

function thenableToObservable(t: firebase.database.ThenableReference): Observable<firebase.database.Reference> {
  return Observable.create(observer =>
    t.then(v => {observer.next(v); observer.complete(); }).catch(e => observer.error(e))
  );
}


function firePromiseToObservable<T>(p: firebase.Promise<T>): Observable<void> {
  return Observable.create(observer =>
    p.then(_ => observer.complete()).catch(e => observer.error(e))
  );
}

function uploadTaskToObservable(t: firebase.storage.UploadTask): Observable<firebase.storage.UploadTaskSnapshot> {
  return Observable.create(observer =>
    t.on('state_changed',
      v => observer.next(v),
      e => observer.error(e),
      () => observer.complete()
    )
  );
}

// Like .`concat` but only computes the final observable after exection
// has finished and the final observable shouldn't emit anything.
function dynamicConcat<T>(o: Observable<T>, f: () => Observable<void>): Observable<T> {
  return Observable.create(observer =>
    o.subscribe({
      next: v => observer.next(v),
      error: error => observer.error(error),
      complete: () => f().subscribe({
        complete: () => observer.complete(),
        error: v => observer.next(v)
      })
    })
  );
}

@Injectable()
export class FilesService {
  files: Observable<File_[] | null>;
  private storage: firebase.storage.Storage;
  private afFiles: FirebaseListObservable<any[]>;

  constructor(private fs: FeedsService, private af: AngularFire, @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    this.afFiles = this.af.database.list('/files/', {
      query: {
        orderByChild: 'feed',
        equalTo: this.fs.selectedID
      }
    });
    this.files = this.afFiles
      .map(
        files => files
          .map(({$key, name, feed, url}) => ({id: $key, name, feed, url}))
          // remove files without URL saved yet
          .filter(({url}) => url)
          // first files should be first
          .reverse()
      );
    this.storage = firebaseApp.storage();
  }

  /*
  Returns a progress observable, that goes form 0 to 1 as the file uploads.
  */
  addFile(file: File): Observable<number> {
    const feedID = this.fs.selectedID.value;
    const name = file.name;

    // create an entry for the file in the database
    return thenableToObservable(this.afFiles.push({feed: feedID, name}))

      // save the file using that ID/key and the name of the file
      .map(({key}) => ({
        id: key,
        task: this.fileRef({id: key, name}).put(file)
      }))
      .concatMap(({id, task}) =>
        dynamicConcat(
          uploadTaskToObservable(task),
          () => firePromiseToObservable(this.afFiles.update(id, {url: task.snapshot.downloadURL}))
        ))
    .map(uts => uts.bytesTransferred / uts.totalBytes);
  }

  private fileRef({id, name}) {
    return this.storage.ref(`${id}/${name}`);
  }

  remove(f: File_) {
    this.afFiles.remove(f.id);
    this.fileRef(f).delete();
  }
}
