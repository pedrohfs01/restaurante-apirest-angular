import { Injectable } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { MenuItem } from "app/models/menu-item.model";

@Injectable()
export class ShoppingCartService{

    items: CartItem[] = [];

    constructor(){

    }

    addItem(item: MenuItem){
        let found = this.items.find((mItem) => mItem.menu.id === item.id)
        if(found){
            found.quantity += 1;
        }else{
            this.items.push(new CartItem(item));
        }
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item, 1));
    }

    clear(){
        this.items = [];
    }

    total(): number{
        return this.items
          .map(item => item.value())
          .reduce((prev, value)=> prev+value, 0)
      }


}