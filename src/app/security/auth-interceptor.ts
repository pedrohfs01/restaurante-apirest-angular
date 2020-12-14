import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenString = localStorage.getItem('access_token');

        const url = request.url;

        if (tokenString && !url.endsWith('/oauth/token')) {
            const token = JSON.parse(tokenString);
            const jwt = token.access_token;
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + jwt
                }
            })
            return next.handle(request);
        } else {
            next.handle(request);
        }

    }


}