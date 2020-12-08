import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private notifyService: NotificationService) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => { 
        this.notifyService.notify(`Bem vindo ${user.name}`) 
      },
        error => {
          this.notifyService.notify(error.error.message);
        });
  }
}
