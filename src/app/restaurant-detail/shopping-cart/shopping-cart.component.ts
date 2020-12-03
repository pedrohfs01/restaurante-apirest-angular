import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'app/services/shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(public cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items() : any[]{
    return this.cartService.items;
  }

  total() : number{
    return this.cartService.total();
  }

  clear(){
    this.cartService.clear();
  }

  removeItem(item: any){
    this.cartService.removeItem(item);
  }

  addItem(item: any){
    this.cartService.addItem(item);
  }

}
