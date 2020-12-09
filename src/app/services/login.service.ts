import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/config/api.config";
import { User } from "app/models/user.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do"
import { Router } from "@angular/router";


@Injectable()
export class LoginService{

    user: User;

    constructor(private http: HttpClient, private router: Router){

    }

    handleLogin(path?: string){
        this.router.navigate(['/login', path])
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
        .do(user => this.user = user);
    }
}