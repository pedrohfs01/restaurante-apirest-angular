import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private notifyService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  loginForm: FormGroup;
  navigateTo: string;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.loginService.tentarLogar(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(response => {
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token)
      this.router.navigate(['/login'])
    },
        error => {
          this.notifyService.notify(error.error.message);
        }, () => {
          this.router.navigate([atob(this.navigateTo)]);
        });
  }
}
