var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { StorageSync } from 'angular2-storage-sync';
var AuthService = (function () {
    function AuthService(af) {
        var _this = this;
        this.af = af;
        this.email = null;
        this.password = null;
        this.loginDate = null;
        this.hasLiked = [];
        af.auth.first().subscribe(function (auth) {
            var loggedIn = !!auth;
            if (_this.pastOneDay) {
                if (loggedIn) {
                    _this.logout();
                }
                else {
                    _this.clearData();
                }
            }
            if (!loggedIn && !_this.pastOneDay && _this.email) {
                _this.relogin();
            }
        });
    }
    Object.defineProperty(AuthService.prototype, "pastOneDay", {
        get: function () {
            if (!this.loginDate) {
                return false;
            }
            var elapsedMS = Date.now() - this.loginDate;
            var MSPerDay = 86400000;
            return elapsedMS > MSPerDay;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.relogin = function () {
        this.af.auth.login({ email: this.email, password: this.password });
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.af.auth.login({ email: email, password: password }).then(function (_) {
            _this.email = email;
            _this.password = password;
            _this.loginDate = Date.now();
        });
    };
    AuthService.prototype.clearData = function () {
        this.email = null;
        this.password = null;
        this.loginDate = null;
        this.hasLiked = [];
    };
    AuthService.prototype.hasLikedFile = function (id) {
        return this.hasLiked.indexOf(id) !== -1;
    };
    AuthService.prototype.likeFile = function (id) {
        console.log(id, this.hasLiked);
        if (!this.hasLikedFile(id)) {
            this.hasLiked = this.hasLiked.concat([id]);
        }
    };
    AuthService.prototype.logout = function () {
        this.clearData();
        return this.af.auth.logout();
    };
    return AuthService;
}());
__decorate([
    StorageSync(),
    __metadata("design:type", Object)
], AuthService.prototype, "email", void 0);
__decorate([
    StorageSync(),
    __metadata("design:type", Object)
], AuthService.prototype, "password", void 0);
__decorate([
    StorageSync(),
    __metadata("design:type", Object)
], AuthService.prototype, "loginDate", void 0);
__decorate([
    StorageSync(),
    __metadata("design:type", Array)
], AuthService.prototype, "hasLiked", void 0);
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], AuthService);
export { AuthService };
//# sourceMappingURL=../../../../src/app/auth.service.js.map