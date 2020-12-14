import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "app/services/login.service";

@Injectable()
export class LoggedInGuard implements CanActivate{
 
    constructor(
        private authService: LoginService,
        private router: Router
      ){}
    
      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
    
        const authenticated =  this.authService.isAuthenticated();
    
        if(authenticated){
          return true;
        }else{
          this.router.navigate(['/login'])
          return false;
        }
    
      }
}