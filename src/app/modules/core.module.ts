import { NgModule } from "@angular/core";
import { OrderService } from "app/services/order.service";
import { RestauranteService } from "app/services/restaurante.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";

@NgModule({
    providers: [RestauranteService, ShoppingCartService, OrderService]
})
export class CoreModule{
    
}