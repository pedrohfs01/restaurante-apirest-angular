import { Injectable } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { Order } from "app/models/order.model";
import { Observable } from "rxjs/Observable";
import { ShoppingCartService } from "./shopping-cart.service";
import "rxjs/add/operator/map"
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MEAT_API } from "app/config/api.config";
import { LoginService } from "./login.service";

@Injectable()
export class OrderService{
    

    constructor(public cartService: ShoppingCartService, 
        public http: HttpClient,
        private loginService: LoginService){

    }

    itemsValue() : number{
        return this.cartService.total();
    }

    cartItems(): CartItem[]{
        return this.cartService.items;
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem){
        this.cartService.removeItem(item);
    }

    clear(){
        this.cartService.clear();
    }

    checkOrder(order: Order) :Observable<string>{
        let headers = new HttpHeaders();
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers:headers})
        .map(order => order.id);
    }
}