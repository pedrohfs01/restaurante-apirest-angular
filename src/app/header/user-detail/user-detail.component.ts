import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { LoginService } from 'app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  usuario: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user();
  }

  user(){
    return this.loginService.getUsuarioAutenticado().subscribe(
      response => this.usuario = response
    );
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
