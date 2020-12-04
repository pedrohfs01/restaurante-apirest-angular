import { Injectable } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { Order } from "app/models/order.model";
import { Observable } from "rxjs/Observable";
import { ShoppingCartService } from "./shopping-cart.service";
import "rxjs/add/operator/map"
import { Http, RequestOptions , Headers} from "@angular/http";
import { MEAT_API } from "app/config/api.config";

@Injectable()
export class OrderService{
    

    constructor(private cartService: ShoppingCartService, private http: Http){

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
        const headers = new Headers;
        headers.append("Content-Type", "application/json")
        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), 
        new RequestOptions({headers: headers})).
        map(response=> response.json())
        .map(order => order.id);
    }
}