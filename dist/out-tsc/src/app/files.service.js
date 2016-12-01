var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { FeedsService } from './feeds.service';
function thenableToObservable(t) {
    return Observable.create(function (observer) {
        return t.then(function (v) { observer.next(v); observer.complete(); }).catch(function (e) { return observer.error(e); });
    });
}
function firePromiseToObservable(p) {
    return Observable.create(function (observer) {
        return p.then(function (_) { return observer.complete(); }).catch(function (e) { return observer.error(e); });
    });
}
function uploadTaskToObservable(t) {
    return Observable.create(function (observer) {
        return t.on('state_changed', function (v) { return observer.next(v); }, function (e) { return observer.error(e); }, function () { return observer.complete(); });
    });
}
function dynamicConcat(o, f) {
    return Observable.create(function (observer) {
        return o.subscribe({
            next: function (v) { return observer.next(v); },
            error: function (error) { return observer.error(error); },
            complete: function () { return f().subscribe({
                complete: function () { return observer.complete(); },
                error: function (v) { return observer.next(v); }
            }); }
        });
    });
}
var FilesService = (function () {
    function FilesService(fs, af, firebaseApp) {
        this.fs = fs;
        this.af = af;
        this.afFiles = this.af.database.list('/files/', {
            query: {
                orderByChild: 'feed',
                equalTo: this.fs.selectedID
            }
        });
        this.files = this.afFiles
            .map(function (files) { return files
            .map(function (_a) {
            var $key = _a.$key, name = _a.name, feed = _a.feed, url = _a.url, comment = _a.comment, likes = _a.likes;
            return ({ id: $key, name: name, feed: feed, url: url, comment: comment, likes: likes });
        })
            .filter(function (_a) {
            var url = _a.url;
            return url;
        })
            .reverse(); });
        this.storage = firebaseApp.storage();
    }
    FilesService.prototype.addFile = function (file, comment) {
        var _this = this;
        var feedID = this.fs.selectedID.value;
        var name = file.name;
        return thenableToObservable(this.afFiles.push({ feed: feedID, name: name, comment: comment, likes: 0 }))
            .map(function (_a) {
            var key = _a.key;
            return ({
                id: key,
                task: _this.fileRef({ id: key, name: name }).put(file)
            });
        })
            .concatMap(function (_a) {
            var id = _a.id, task = _a.task;
            return dynamicConcat(uploadTaskToObservable(task), function () { return firePromiseToObservable(_this.afFiles.update(id, { url: task.snapshot.downloadURL })); });
        })
            .map(function (uts) { return uts.bytesTransferred / uts.totalBytes; });
    };
    FilesService.prototype.fileRef = function (_a) {
        var id = _a.id, name = _a.name;
        return this.storage.ref(id + "/" + name);
    };
    FilesService.prototype.remove = function (f) {
        this.afFiles.remove(f.id);
        this.fileRef(f).delete();
    };
    FilesService.prototype.like = function (f) {
        this.afFiles.update(f.id, { likes: f.likes + 1 });
    };
    return FilesService;
}());
FilesService = __decorate([
    Injectable(),
    __param(2, Inject(FirebaseApp)),
    __metadata("design:paramtypes", [FeedsService, AngularFire, Object])
], FilesService);
export { FilesService };
//# sourceMappingURL=../../../../src/app/files.service.js.map