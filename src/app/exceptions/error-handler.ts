import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { LoginService } from "app/services/login.service";
import { NotificationService } from "app/services/notification.service";
import "rxjs/add/observable/throw";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
    
    constructor(private ns: NotificationService, private injector: Injector){
        super();
    }

    errorHandler(errorResponse: HttpErrorResponse | any) {
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message;
        
            switch(errorResponse.status){
                case 401:
                    this.injector.get(LoginService).handleLogin();
                    break;
                case 403:
                    this.ns.notify(message || 'Não autorizado.')
                    break;
                case 404:
                    this.ns.notify(message || 'Recurso não encontrado.')
                    break;
            }
        }
        
        super.handleError(errorResponse);
    }
}