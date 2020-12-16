import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetailComponent } from 'app/header/user-detail/user-detail.component';
import { User } from 'app/models/user.model';
import { LoginService } from 'app/services/login.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private notifyService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  loginForm: FormGroup;
  navigateTo: string;
  user: User;

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
    if (this.loginService.isAuthenticated()) {
      return this.router.navigate([atob(this.navigateTo)]);
    } else {
      this.loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required])
      });
    }
  }

  login() {
    this.loginService.tentarLogar(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
      },
        error => {
          this.notifyService.notify("Login ou senha incorretos.");
        }, () => {
          this.router.navigate([atob(this.navigateTo)]);
          const email = this.jwtHelper.decodeToken(localStorage.getItem('access_token')).user_name
          this.notificar(email);
        });
  }

  notificar(email: string) {
    this.loginService.getUsuarioByEmail(email).subscribe(response => {
      this.user = response;
      this.notifyService.notify(`Bem vindo ${this.user.name}`);
    });
  }
}
