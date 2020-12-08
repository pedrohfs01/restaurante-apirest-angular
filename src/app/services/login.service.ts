import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/config/api.config";
import { User } from "app/models/user.model";
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginService{

    constructor(private http: HttpClient){

    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
    }
}