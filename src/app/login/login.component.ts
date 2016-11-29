import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string;
  emailInvalid = false;
  passwordInvalid = false;

  constructor(public af: AngularFire) {}
  login(email: any, password: any) {
    this.emailInvalid = !email.value;
    this.passwordInvalid = !password.value;
    if (email.value && password.value) {
      this.af.auth.login({
        email: email.value,
        password: password.value,
      }).catch(error => {
        password.value = '';
        this.error = error.message;
      });
    }
  }
}
