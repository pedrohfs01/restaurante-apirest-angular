import { Injectable } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { Order } from "app/models/order.model";
import { Observable } from "rxjs";
import { ShoppingCartService } from "./shopping-cart.service";
import { map } from "rxjs/operators"
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "app/config/api.config";
import { LoginService } from "./login.service";

@Injectable()
export class OrderService {


    constructor(public cartService: ShoppingCartService,
        public http: HttpClient,
        private loginService: LoginService) {

    }

    itemsValue(): number {
        return this.cartService.total();
    }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    clear() {
        this.cartService.clear();
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .pipe(map(order => order.id));
    }
}