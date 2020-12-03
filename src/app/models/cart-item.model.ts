import { MenuItem } from "./menu-item.model";

export class CartItem{
    constructor(public menu: MenuItem, 
                public quantity: number = 1){

    }

    value(): number {
        return this.menu.price * this.quantity;
    }
}