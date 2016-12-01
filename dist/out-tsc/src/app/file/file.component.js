var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { FilesService } from '../files.service';
var FileComponent = (function () {
    function FileComponent(user, fs, auth, cdr) {
        this.user = user;
        this.fs = fs;
        this.auth = auth;
        this.cdr = cdr;
        this.canLikeFile = false;
    }
    FileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user.admin.first().subscribe(function (admin) {
            _this.admin = admin;
            _this.updateCanLikeFile();
        });
    };
    FileComponent.prototype.updateCanLikeFile = function () {
        this.canLikeFile = this.admin || !this.auth.hasLikedFile(this.file.id);
        this.cdr.detectChanges();
    };
    FileComponent.prototype.remove = function () {
        this.fs.remove(this.file);
    };
    FileComponent.prototype.like = function () {
        this.fs.like(this.file);
        this.auth.likeFile(this.file.id);
        this.updateCanLikeFile();
    };
    return FileComponent;
}());
__decorate([
    Input('app-file'),
    __metadata("design:type", File)
], FileComponent.prototype, "file", void 0);
FileComponent = __decorate([
    Component({
        selector: '[app-file]',
        templateUrl: './file.component.html',
        styleUrls: ['./file.component.css']
    }),
    __metadata("design:paramtypes", [UserService, FilesService, AuthService, ChangeDetectorRef])
], FileComponent);
export { FileComponent };
//# sourceMappingURL=../../../../../src/app/file/file.component.js.map