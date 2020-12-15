import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "app/models/user.model";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { NotificationService } from "./notification.service";



@Injectable()
export class LoginService {

    apiURL: string = environment.api + "/users/"
    tokenURL: string = environment.api + environment.obterTokenUrl
    clientID: string = environment.clientId;
    clientSecret: string = environment.clientSecret;


    jwtHelper: JwtHelperService = new JwtHelperService();

    lastUrl: string
    user: User;

    constructor(private http: HttpClient, 
                private router: Router) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    getUsuarioByEmail(email: string): Observable<User>{
        return this.http.get<User>(`${this.apiURL}email/${email}`);
    }

    obterToken() {
        const tokenString = localStorage.getItem('access_token')
        if (tokenString) {
            const token = JSON.parse(tokenString).access_token
            return token;
        }
        return null;
    }

    encerrarSessao() {
        localStorage.removeItem('access_token')
        this.handleLogin();
    }

    getUsuarioAutenticado() {
        const token = this.obterToken();
        if (token) {
            const usuario = this.jwtHelper.decodeToken(token).user_name
            return this.getUsuarioByEmail(usuario);
        }
        return null;
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)])
    }


    isAuthenticated(): boolean {
        const token = this.obterToken();
        if (token) {
            const expired = this.jwtHelper.isTokenExpired(token)
            return !expired;
        }
        return false;
    } 
    tentarLogar(username: string, password: string): Observable<any> {
        const params = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('grant_type', 'password')

        const headers = {
            'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        return this.http.post(this.tokenURL, params.toString(), { headers });
    }
}