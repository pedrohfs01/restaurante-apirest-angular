import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "app/services/login.service";
import { NotificationService } from "app/services/notification.service";

@Injectable()
export class LoggedInGuard implements CanActivate{
 
    constructor(
        private authService: LoginService,
        private router: Router,
        private notifyService: NotificationService
      ){}
    
      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
    
        const authenticated =  this.authService.isAuthenticated();
    
        if(authenticated){
          this.notifyService.notify("Entre na sua conta para efetuar a compra");
          return true;
        }else{
          this.router.navigate(['/login'])
          return false;
        }
    
      }
}