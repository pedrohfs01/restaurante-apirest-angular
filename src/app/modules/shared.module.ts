import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "app/security/auth-interceptor";
import { LeaveOrderGuard } from "app/security/leave-order.guard";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { LoginService } from "app/services/login.service";
import { NotificationService } from "app/services/notification.service";
import { OrderService } from "app/services/order.service";
import { RestauranteService } from "app/services/restaurante.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { SnackbarComponent } from "app/shared/messages/snackbar/snackbar.component";
import { InputComponent } from "../shared/input/input.component";
import { RadioComponent } from "../shared/radio/radio.component";
import { RatingComponent } from "../shared/rating/rating.component";

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent,
              CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers:[
                ShoppingCartService, RestauranteService, 
                OrderService, NotificationService, LoginService,
                LoggedInGuard, LeaveOrderGuard,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}    
            ]
        }
    }
}