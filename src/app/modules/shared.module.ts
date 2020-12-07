import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderService } from "app/services/order.service";
import { RestauranteService } from "app/services/restaurante.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { InputComponent } from "../shared/input/input.component";
import { RadioComponent } from "../shared/radio/radio.component";
import { RatingComponent } from "../shared/rating/rating.component";

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, 
              CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers:[ShoppingCartService, RestauranteService, OrderService]
        }
    }
}