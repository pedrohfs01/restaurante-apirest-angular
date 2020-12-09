import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "app/order/order.component";


export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{

    canDeactivate(
        orderComponent: OrderComponent, 
        activatedRoute: ActivatedRouteSnapshot,
        routeState: RouterStateSnapshot): boolean{
            if(!orderComponent.isOrderCompleted()){
                return confirm('Deseja desistir da compra?')
            }else{return true;}
    }

}