import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User{
    return this.loginService.user;
  }

  isLoggedIn(): boolean{
    return this.loginService.isAuthenticated();
  }

  login() {
    return this.loginService.handleLogin();
  }

  logout(){
    return this.loginService.encerrarSessao();
  }

}
