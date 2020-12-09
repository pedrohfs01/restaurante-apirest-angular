import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/config/api.config";
import { User } from "app/models/user.model";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators"
import { NavigationEnd, Router } from "@angular/router";


@Injectable()
export class LoginService {

    user: User;
    lastUrl: string

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)])
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
            .pipe(tap(user => this.user = user));
    }

    logout() {
        this.user = undefined;
    }
}