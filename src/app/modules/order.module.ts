import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeliveryCostComponent } from "app/order/delivery-cost/delivery-cost.component";
import { OrderItensComponent } from "app/order/order-itens/order-itens.component";
import { OrderComponent } from "app/order/order.component";
import { LeaveOrderGuard } from "app/security/leave-order.guard";
import { SharedModule } from "./shared.module";

const ROUTES: Routes =[
    {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    declarations:[OrderComponent, OrderItensComponent, DeliveryCostComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule{
    
}