import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string;
  emailInvalid = false;
  passwordInvalid = false;

  constructor(private auth: AuthService) {}

  login(email: any, password: any) {
    this.emailInvalid = !email.value;
    this.passwordInvalid = !password.value;
    if (email.value && password.value) {
      this.auth.login(email.value, password.value).catch(error => {
        password.value = '';
        this.error = error.message;
      });
    }
  }
}
