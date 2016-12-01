var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FeedsService } from '../feeds.service';
import { UserService } from '../user.service';
var FeedComponent = (function () {
    function FeedComponent(fs, user) {
        this.fs = fs;
        this.user = user;
    }
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selected = this.fs.selectedID.map(function (id) { return id === _this.feed.id; });
    };
    FeedComponent.prototype.fixSpace = function (event) {
        if (event.key === ' ') {
            document.execCommand('insertHTML', false, ' ');
        }
    };
    FeedComponent.prototype.select = function () {
        this.fs.select(this.feed.id);
    };
    FeedComponent.prototype.remove = function () {
        this.fs.remove(this.feed.id);
    };
    FeedComponent.prototype.rename = function (el) {
        var newName = el.innerText;
        if (newName !== this.feed.name) {
            this.fs.rename(this.feed.id, newName);
        }
    };
    return FeedComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], FeedComponent.prototype, "feed", void 0);
FeedComponent = __decorate([
    Component({
        selector: 'app-feed',
        templateUrl: './feed.component.html',
        styleUrls: ['./feed.component.css']
    }),
    __metadata("design:paramtypes", [FeedsService, UserService])
], FeedComponent);
export { FeedComponent };
//# sourceMappingURL=../../../../../src/app/feed/feed.component.js.map