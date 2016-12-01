var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
var LoginComponent = (function () {
    function LoginComponent(auth) {
        this.auth = auth;
        this.emailInvalid = false;
        this.passwordInvalid = false;
    }
    LoginComponent.prototype.login = function (email, password) {
        var _this = this;
        this.emailInvalid = !email.value;
        this.passwordInvalid = !password.value;
        if (email.value && password.value) {
            var emailValue = email.value;
            if (emailValue.indexOf('@') === -1) {
                emailValue = emailValue + '@dummydomain.com';
            }
            this.auth.login(emailValue, password.value).catch(function (error) {
                password.value = '';
                _this.error = error.message;
            });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [AuthService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=../../../../../src/app/login/login.component.js.map